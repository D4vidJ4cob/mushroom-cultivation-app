import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const commonCultureFields = {
  inoculationDate: yup
    .date()
    .required('Inoculation date is required')
    .max(new Date(), 'Inoculation date cannot be in the future'),
};

export const speciesSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
});

export const motherCultureSchema = yup.object({
  ...commonCultureFields,
  name: yup.string().required('Name is required'),
  speciesId: yup.number().required('Species is required').positive(),
  characteristic: yup.string(),
});

export const liquidCultureSchema = yup.object({
  ...commonCultureFields,
  name: yup.string().required('Name is required'),
  speciesId: yup.number().required('Species is required').positive(),
  characteristic: yup.string(),
});

export const grainSpawnSchema = yup.object({
  ...commonCultureFields,
  speciesId: yup.number().required('Species is required').positive(),
  shaken: yup.boolean().default(false),
  sourceType: yup.string()
    .oneOf(['motherCulture', 'liquidCulture'], 'Invalid source type')
    .required('Source type is required'),
  motherCultureId: yup.number().when('sourceType', {
    is: 'motherCulture',
    then: (schema) => schema.required('Mother culture is required').positive(),
  }),
  liquidCultureId: yup.number().when('sourceType', {
    is: 'liquidCulture',
    then: (schema) => schema.required('Liquid culture is required').positive(),
  }),
});

export const substrateSchema = yup.object({
  grainSpawnId: yup.number().required('Grain spawn is required').positive(),
  ...commonCultureFields,
  contaminationStatus: yup.boolean().default(false),
  incubationDate: yup
    .date()
    .nullable()
    .notRequired()
    .max(new Date(), 'Incubation date cannot be in the future'),
});