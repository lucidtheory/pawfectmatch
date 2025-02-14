import { FC } from 'react';
import {
    SubmitHandler,
    FormProvider,
    useForm,
} from 'react-hook-form';
import Input from 'components/forms/Input/Input';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/regex';

interface ILoginForm {
    email: string;
    password: string;
}

const EMAIL_RULES = {
    required: 'Email is required',
    pattern: {
        value: EMAIL_REGEX,
        message: 'Please enter a valid email address',
    },
}

const PASSWORD_RULES = {
    required: 'Password is required',
    pattern: {
        value: PASSWORD_REGEX,
        message: 'Password must be between 6 and 10 characters and contain at least one letter and one number',
    },
}

const LoginForm: FC = () => {
  const hookFormMethods = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
  };

  return (
    <>
        <h2>Login</h2>
        <FormProvider {...hookFormMethods}>
            <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    label="Email"
                    type="email"
                    rules={EMAIL_RULES}
                />
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    rules={PASSWORD_RULES}
                    maxLength={10}
                />
                <button type="submit">Login</button>
            </form>
        </FormProvider>
    </>
  );
};

export default LoginForm;