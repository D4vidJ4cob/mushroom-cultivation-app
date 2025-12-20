// src/pages/Login.jsx
import { useFormik } from 'formik';
import { loginSchema } from '../schemas';
import LabelInput from '../components/LabelInput';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/auth';

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { login } = useAuth();

  const { handleSubmit, touched, errors, getFieldProps, isSubmitting, resetForm } = useFormik({
    initialValues: {
      email: 'davidjacob.bjj@gmail.com',
      password: '12345678',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const success = await login(values.email, values.password);
      
      if (success) {
        const params = new URLSearchParams(search);
        navigate(params.get('redirect') || '/', { replace: true });
      } else {
        console.error('Login failed');
      }
    },
  });

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <LabelInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            {...getFieldProps('email')}
            touched={touched.email}
            error={errors.email}
            disabled={isSubmitting}
            data-cy="email_input"
          />

          <LabelInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...getFieldProps('password')}
            touched={touched.password}
            error={errors.password}
            disabled={isSubmitting}
            data-cy="password_input"
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 
              dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md text-white bg-amber-600 
              hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              data-cy="submit_btn"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}