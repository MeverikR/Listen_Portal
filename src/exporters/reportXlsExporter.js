// экспортер данных отчета "Звонки" в XLSX

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const exporterXlsx = (report) => {

        let url = process.env.REACT_APP_API_URL + '/xls';
        const filters = getParameterByName('filter', window.location.href);
        if (filters ){
        url = process.env.REACT_APP_API_URL + '/xls?filter=' + encodeURIComponent(filters ) ;
        }

    const filename = 'report';
    return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' +  localStorage.getItem('token')
    }
  }).then(function(resp) {
    return resp.blob();
  }).then(function(xls_priletel) {



    var fakeLink = document.createElement('a');
    fakeLink.style.display = 'none';
    document.body.appendChild(fakeLink);
    var blob = new Blob([xls_priletel], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // Manage IE11+ & Edge
        window.navigator.msSaveOrOpenBlob(blob, filename + ".xls");
    }
    else {
        fakeLink.setAttribute('href', URL.createObjectURL(blob));
        fakeLink.setAttribute('download', filename + ".xls");
        fakeLink.click();
    }



  });

}

