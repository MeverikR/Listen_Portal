import PropTypes from "prop-types";
import React from "react";

const translateFinishReason = {
    'numb_not_exists' : 'Виртуальный номер не найден',
    'incorrect_input' : 'Некорректный ввод',
    'numb_is_inactive' : 'Виртуальный номер не активен',
    'sitephone_is_not_configured' : 'Сайтфон не настроен',
    'app_is_inactive' : 'Клиент деактивирован',
    'numa_in_black_list' : 'Вызывающий абонент в чёрном списке',
    'no_active_scenario' : 'Не найден активный сценарий',
    'simple_forwarding_is_not_configured' : 'Аналитика: простая переадресация не настроена',
    'site_not_exists' : 'Сайт не найден',
    'call_generator_is_not_configured' : 'Лидогенератор не настроен',
    'add_cdr_timeout' : 'Не определена',
    'success_finish' : 'Не определена',
    'api_permission_denied' : 'Доступ к Call API запрещён',
    'api_ip_now_allowed' : 'IP адрес не в списке разрешённых',
    'component_is_inactive' : 'Компонент не активен',
    'employee_not_exists' : 'Сотрудник не найден',
    'not_enough_money' : 'Недостаточно средств',
    'platform_not_found' : 'Обратитесь в службу технической поддержки',
    'internal_error' : 'Обратитесь в службу технической поддержки',
    'incorrect_config' : 'Недопустимая конфигурация',
    'communication_unavailable' : 'Недоступный тип связи',
    'subscriber_disconnects' : 'Абонент разорвал соединение',
    'no_operation' : 'Нет операции для обработки',
    'scenario_not_found' : 'Сценарий не найден',
    'no_money' : 'Закончились деньги или достигнут финансовый лимит',
    'transfer_disconnects' : 'Отключение сотрудника при трансфере',
    'scenario_disconnects' : 'Отключение сотрудника при запуске сценария',
    'fax_session_done' : 'Факс принят',
    'no_resources' : 'Лимит клиента исчерпан',
    'another_operator_answer' : 'Дозвонились до другого сотрудника',
    'subscriber_busy' : 'Абонент занят',
    'subscriber_not_responsible' : 'Абонент не отвечает',
    'subscriber_number_problems' : 'Проблемы с телефонным номером абонента. Обратитесь в службу технической поддержки.',
    'operator_answer' : 'Дозвонились до сотрудника',
    'locked_numb' : 'Звонки на этот номер запрещены настройками безопасности',
    'call_not_allowed_on_tp' : 'Звонок запрещен согласно тарифному плану',
    'account_not_found' : 'Не найден лицевой счёт',
    'contract_not_found' : 'Не найден договор',
    'operator_busy' : 'Сотрудник занят',
    'operator_not_responsible' : 'Сотрудник не отвечает',
    'operator_disconnects' : 'Сотрудник разорвал соединение',
    'operator_number_problems' : 'Проблемы с телефонным номером сотрудника. Обратитесь в службу технической поддержки.',
    'timeout' : 'Время дозвона истекло',
    'operator_channels_busy' : 'Закончились доступные линии на номере переадресации',
    'locked_phone' : 'Проблемы с сетью',
    'max_in_call_reached' : 'Достигнут лимит линий для входящих звонков',
    'max_out_call_reached' : 'Достигнут лимит линий для исходящих звонков',
    'employee_busy' : 'Сотрудник разговаривает в другом звонке',
    'phone_group_inactive_by_schedule' : 'Группа номеров неактивна согласно расписанию',
    'sip_offline' : 'SIP-линия не зарегистрирована',
    'employee_inactive' : 'Сотрудник неактивен',
    'employee_inactive_by_schedule' : 'Сотрудник неактивен согласно расписанию',
    'employee_phone_inactive' : 'Номер сотрудника неактивен',
    'action_interval_exceeded' : 'Превышен интервал, указанный на операции',
    'group_phone_inactive' : 'Номер в группе недоступен',
    'no_operator_confirmation' : 'Сотрудник не подтвердил вызов',
    'max_transition_count_exceeded' : 'Достигнуто максимальное количество переходов по операциям сценария',
    'no_success_subscriber_call' : 'Не дозвонились до абонента',
    'no_success_operator_call' : 'Не дозвонились до сотрудника',
    'disconnect_before_call_processing' : 'Разъединение до обработки вызова',
    'processing_method_not_found' : 'Способ обработки не найден',
    'employee_without_phones' : 'У сотрудника нет номеров',
    'group_without_phones' : 'В группе сотрудников нет номеров',
    'no_operator_cdr_found' : 'Вызовы сотрудникам не найдены'
}
    

const FinishReasonField = ({ source, record = {} }) => {
    return (
        <React.Fragment>
            <p key={record[source]}>{translateFinishReason.hasOwnProperty(record[source]) ? translateFinishReason[record[source]] : 'неизвестно'}</p>
        </React.Fragment>
    )
}

FinishReasonField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

FinishReasonField.defaultProps = { addLabel: true };

export default FinishReasonField;