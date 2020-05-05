
import {TextField, DateField, NumberField, UrlField, ChipField, BooleanField } from 'react-admin';
import  ReportSourceField from './fields/ReportSourceField';
import  SecondsToTimeField from './fields/SecondsToTimeField';
import  EnumField from './fields/EnumField';
import  DateTimeField from './fields/DateTimeField';
import  PhoneTextField from './fields/PhoneTextField';
import  FinishReasonField from './fields/FinishReasonField';

const fieldsMapper = {
    TextField : TextField,
    DateField: DateField,
    NumberField: NumberField,
    UrlField: UrlField,
    ChipField : ChipField,
    BooleanField: BooleanField,
    ReportSourceField: ReportSourceField,
    SecondsToTimeField: SecondsToTimeField,
    EnumField: EnumField,
    DateTimeField : DateTimeField,
    PhoneTextField: PhoneTextField,
    FinishReasonField: FinishReasonField
}

export default fieldsMapper;