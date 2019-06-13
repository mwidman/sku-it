import { isString, isObject } from 'util';

export const convertError = (error: any): object => { 
  if(error.error) {
    if(isString(error.error)) {
      return { error: error.error};
    }
    else if(isObject(error.error)) {
      return error.error;
    }
  }
  else if(error.status) {
    switch(error.status) {
      case 400: return { error: 'The was a problem with your request (invalid value, etc.).' };
      case 404: return { error: 'Could not find the resource you were looking for.' };
      case 500: return { error: 'An unknown server error occurred.' };
      default: return { error: 'Uknown error occured' };
    }
  }
  else {
    return { error: 'Uknown error occured' };
  }
}
