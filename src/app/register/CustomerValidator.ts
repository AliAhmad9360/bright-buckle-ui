import { Validator } from "fluentvalidation-ts";
type Customer = {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    zipCode: string;
    username: string;
    password: string;
}

class CustomerValidator extends Validator<Customer>{
    constructor(){
        super();
        this.ruleFor('firstName').minLength(3).withMessage('Please enter a valid first name');
        this.ruleFor('email').emailAddress().withMessage('Please enter a valid email address.');
        this.ruleFor('password').minLength(8).withMessage('Your password should be at least 8 characters long.');
        this.ruleFor('zipCode').notNull().notEmpty().withMessage('You must provide a ZIP code.')
    }
}

export default CustomerValidator;