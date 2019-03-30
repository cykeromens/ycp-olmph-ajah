import {Moment} from 'moment';

export const enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const enum MaritalStatusEnum {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED'
}

export const enum StateEnum {
  ABIA = 'ABIA',
  ADAMAWA = 'ADAMAWA',
  AKWAIBOM = 'AKWA IBOM',
  ANAMBRA = 'ANAMBRA',
  BAUCHI = 'BAUCHI',
  BAYELSA = 'BAYELSA',
  BENUE = 'BENUE',
  BORNO = 'BORNO',
  CROSSRIVER = 'CROSS RIVER',
  DELTA = 'DELTA',
  EBONYI = 'EBONYI',
  ENUGU = 'ENUGU',
  EDO = 'EDO',
  EKITI = 'EKITI',
  GOMBE = 'GOMBE',
  IMO = 'IMO',
  JIGAWA = 'JIGAWA',
  KADUNA = 'KADUNA',
  KANO = 'KANO',
  KASTINA = 'KATSINA',
  KEBBI = 'KEBBI',
  KOGI = 'KOGI',
  KWARA = 'KWARA',
  LAGOS = 'LAGOS',
  NASARAWA = 'NASARAWA',
  NIGER = 'NIGER',
  OGUN = 'OGUN',
  ONDO = 'ONDO',
  OSUN = 'OSUN',
  OYO = 'OYO',
  PLATEAU = 'PLATEAU',
  RIVERS = 'RIVERS',
  SOKOTO = 'SOKOTO',
  TARABA = 'TARABA',
  YOBE = 'YOBE',
  ZAMFARA = 'ZAMFARA',
  FCT = 'FCT'
}

export const enum NationalityEnum {
  BENIN = 'BENIN',
  CAMEROON = 'CAMEROON',
  GHANA = 'GHANA',
  NIGERIA = 'NIGERIA',
  TOGO = 'TOGO'
}

export interface IUserBioDataModel {
  id?: number;
  dateOfBirth?: Moment;
  gender?: GenderEnum;
  maritalStatus?: MaritalStatusEnum;
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseLastName?: string;
  stateOfOrigin?: StateEnum;
  nationality?: NationalityEnum;
}

export class UserBioDataModel implements IUserBioDataModel {
  constructor(
    public id?: number,
    public dateOfBirth?: Moment,
    public gender?: GenderEnum,
    public maritalStatus?: MaritalStatusEnum,
    public spouseFirstName?: string,
    public spouseMiddleName?: string,
    public spouseLastName?: string,
    public stateOfOrigin?: StateEnum,
    public nationality?: NationalityEnum,
  ) {
  }
}
