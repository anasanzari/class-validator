import { ValidationOptions } from '../ValidationOptions';
import { ValidationMetadataArgs } from '../../metadata/ValidationMetadataArgs';
import { ValidationTypes } from '../../validation/ValidationTypes';
import { ValidationMetadata } from '../../metadata/ValidationMetadata';
import { getMetadataStorage } from '../../metadata/MetadataStorage';

export const IS_OPTIONAL_IF = 'isOptionalIf';

/**
 * Checks if value is missing and if so, ignores all validators.
 */
export function IsOptionalIf(condition: (object: any, value: any) => boolean, validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string): void {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      name: IS_OPTIONAL_IF,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [
        (object: any, value: any): boolean => {
            if (!condition(object, value)) {
                return true;
            }
            return object[propertyName] !== null && object[propertyName] !== undefined;
        },
      ],
      validationOptions: validationOptions,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
}
