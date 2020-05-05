import React, {Component} from 'react';
import {List, Datagrid, TextField, ArrayField ,
    SingleFieldList, Filter, CardActions, ExportButton,RefreshButton  } from 'react-admin';
import { DateInput} from 'react-admin-date-inputs';

import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import { withStyles } from '@material-ui/core/styles';
// плеер
import PlayerField from "./fields/PlayerField";
// управление тегами
import TagSelectField  from "./fields/TagSelectField";
import TagChiepField  from "./fields/TagChiepField";
import StaticListenField  from "./fields/StaticListenField";

import fieldMapper from './mapper';
import  PhoneTextField from './fields/PhoneTextField';
import  { exporterXlsx } from './exporters/reportXlsExporter';

DateFnsUtils.prototype.getStartOfMonth = DateFnsUtils.prototype.startOfMonth;
// различаем потерянные звонки
const lostRowStyle = (record, index) => ({
    backgroundColor: record.is_lost ? '#ffd5cd' : 'white',
});

const ReportTitle = ({ record }) => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    return <span>{user.client.name}: Список звонков [{user.name}]</span>;
};

const date_from = new Date(new Date() - 24*3600000*7);
const date_till = new Date();
const emptyLabelStart = `${date_from.getDate()<10 ? '0'+date_from.getDate() : date_from.getDate()}/${(date_from.getMonth()+1)<10 ? '0'+(date_from.getMonth()+1) : (date_from.getMonth()+1)}/${date_from.getFullYear()}`;
const emptyLabelEnd = `${date_till.getDate()<10 ? '0'+date_till.getDate() : date_till.getDate()}/${(date_till.getMonth()+1)<10 ? '0'+(date_till.getMonth()+1) : (date_till.getMonth()+1)}/${date_till.getFullYear()}`;
let selectedDateStartGl = date_from,
selectedDateEndGl = date_till; 


class PeriodFilter extends Component {

    componentDidUpdate = () => {
        selectedDateStartGl = this.props.filterValues._date_from
        selectedDateEndGl = this.props.filterValues._date_till       
    }

    render() { 
        //console.log(selectedDateStartGl)
        const dateString = v => {
        if (isNaN(v)) return;
        let parsedDate = new Date(v);

        return new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);
        };     
        
        return ( 
            <Filter {...this.props}>
                <DateInput  source="_date_from" label="Период  с: " parse={dateString}
                    options={{ format: 'dd/MM/yyyy', ampm: 'false', clearable: true, disableFuture: true,
                        awareofunicodetokens: 'true', initialFocusedDate: date_from, utcOffset:3,
                        emptyLabel: emptyLabelStart, maxDate: new Date(selectedDateEndGl),
                        invalidDateMessage: 'Неверная дата', cancelLabel: "Отмена", clearLabel:"Сбросить"
                    }} providerOptions={{ utils: DateFnsUtils, locale: ruLocale }} alwaysOn isRequired={true} />
                <DateInput source="_date_till" label="по: " parse={dateString}
                    options={{ format: 'dd/MM/yyyy', ampm: 'false', clearable: true, disableFuture: true,
                        awareofunicodetokens: 'true', utcOffset:3, emptyLabel: emptyLabelEnd, minDate: new Date(selectedDateStartGl),
                        invalidDateMessage: 'Неверная дата' , cancelLabel: "Отмена", clearLabel:"Сбросить"
                    }} providerOptions={{ utils: DateFnsUtils, locale: ruLocale }} alwaysOn isRequired={true} />
            </Filter>
         );
    }
}

// экспорт и кнопки действий
const ReportActions = ({
    bulkActions,
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
    total
}) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }

        <ExportButton
            disabled={total === 0}
            resource={resource}
            sort={currentSort}
            filter={filterValues}
            exporter={exporterXlsx}
        />
        <RefreshButton />
        {/* Add your custom actions */}
        {/*<Button color="primary" onClick={customAction}>Custom Action</Button>*/}
    </CardActions>
);


const styles = {
    row: {
        backgroundColor: '#ccc',
    },
};


 const ReportList =  ({ classes, ...props })  => {
     const user = JSON.parse(localStorage.getItem('current_user'));

     const fields = user.params.fields; // поля юзера
     let flds = {};
     user.client.fields_available.forEach(function(val, i){
         flds[val['id']] = {'label':val['name'], 'type':val['_type'] || 'TextField',
             'sort': val['_sort'] || false, 'parent': val['_parent'] || false}
     });

    // готовим список полей для юзера

     let elements = [];
     fields.forEach(function(v, k){
        let field = flds[v];
            let CompoElem = fieldMapper[field.type];
            if (!field.parent) {
                elements.push(<CompoElem source={v} label={field.label} sortable={field.sort}/>)
            } else {
                elements.push(
                    <ArrayField source={field.parent} label={field.label} linkType={false} sortable={field.sort ? 1 : 0}>
                        <SingleFieldList>
                            <CompoElem source={v}/>
                        </SingleFieldList>
                    </ArrayField>
                )
            }
     });


     return (
    <List {...props} title={<ReportTitle />}  bulkActions={false} actions={<ReportActions />} filters={<PeriodFilter />}>
        <Datagrid rowStyle={lostRowStyle}  >

            {user.params.hide_sys_static ? null : <StaticListenField  source="listened" label="" sortable={false}/>}
            {user.params.hide_sys_id ? null : <TextField label="ID" source="communication_id" style={{fontSize: '13px'}} sortable={false}/>}

            { user.params.hide_sys_aon ? null : <PhoneTextField label="АОН" source="contact_phone_number" sortable={false}/> }
            {/* рендерим дополнительные пользовательские поля */}
            {elements}

            {/* // конец пользовательских полей */}
            { user.params.hide_sys_player ? null :  <PlayerField label="Запись" source="call_records" sortable={false}/> }
            <ArrayField source="tags" label="Теги" sortable={false} >
                <SingleFieldList linkType={false} >
                    <TagChiepField source="tag_name"  />
                </SingleFieldList>
            </ArrayField>

            {user.params.tags.length !== 0 ? <TagSelectField source="tag" label="Операции" sortable={false}/> : null}

        </Datagrid>

    </List>

)};
 export default withStyles(styles)(ReportList);