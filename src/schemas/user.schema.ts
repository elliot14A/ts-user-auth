import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(4, "Password is too short - should be atleast 6 chars long!"),
        passwordConfirmation: string({
            required_error: 'comfirmation password is required'
        }),
        email: string({
            required_error: 'email is required'
        }).email('Given email is not a valid email')
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "passwords do not match!",
        path: ["passwordConfirmation"]
    })
});

export type CreateUserSchema = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">