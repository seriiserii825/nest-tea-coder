import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
export function StartWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    // Register the custom validator
    registerDecorator({
      name: 'StartWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with "${prefix}"`;
        },
      },
    });
  };
}
