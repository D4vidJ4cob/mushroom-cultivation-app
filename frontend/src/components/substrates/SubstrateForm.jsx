import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { substrateSchema } from '../../schemas';
import LabelSelect from '../LabelSelect';
import LabelInput from '../LabelInput';
import LabelRadio from '../LabelRadio';

const formatDateForInput = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return date.split('T')[0];
};

export default function SubstrateForm({ substrate, grainSpawns, saveSubstrate, isEditing }) {
  const navigate = useNavigate();

  const {values, handleBlur, handleSubmit, setFieldValue, touched, errors, getFieldProps, isSubmitting} = useFormik({
    initialValues: {
      grainSpawnId: substrate?.grainSpawnId || '',
      inoculationDate: formatDateForInput(substrate?.inoculationDate),
      incubationDate: substrate?.incubationDate ? formatDateForInput(substrate.incubationDate) : '',
      contaminationStatus: substrate?.contaminationStatus ?? false,
    },
    validationSchema: substrateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = isEditing ? { id: substrate.id, ...values} : values;
        await saveSubstrate(data);
        navigate('/substrates');
      } catch (err) {
        console.error('Failed to save substrate', err);
      }
    },
  });

  const grainSpawnOptions = grainSpawns?.map((gs) => ({
    id: gs.id,
    name: `${gs.species?.name} - GS#${gs.id}`,
  })) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <LabelSelect
        label="Grain Spawn"
        placeholder="Select a grain spawn"
        options={grainSpawnOptions}
        {...getFieldProps('grainSpawnId')}
        touched={touched.grainSpawnId}
        error={errors.grainSpawnId}
        disabled={isSubmitting}
      />

      <LabelInput
        label="Inoculation Date"
        type="date"
        {...getFieldProps('inoculationDate')}
        touched={touched.inoculationDate}
        error={errors.inoculationDate}
        disabled={isSubmitting}
      />

      <LabelRadio
        label="Is the substrate contaminated?"
        name="contaminationStatus"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={values.contaminationStatus}
        onChange={setFieldValue}
        onBlur={handleBlur}
        touched={touched.contaminationStatus}
        error={errors.contaminationStatus}
        disabled={isSubmitting}
      />

      <LabelInput
        label="Incubation Date"
        type="date"
        {...getFieldProps('incubationDate')}
        touched={touched.incubationDate}
        error={errors.incubationDate}
        disabled={isSubmitting}
      />

      <div className='flex justify-end gap-3 mt-8'>
        <button 
          type='button' 
          onClick={() => navigate('/substrates')}
          className='px-6 py-3 rounded-xl font-semibold
          bg-white/50 dark:bg-gray-900/50 
          text-gray-700 dark:text-gray-300
          border-2 border-gray-200 dark:border-gray-700
          hover:border-gray-300 dark:hover:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-800
          transform hover:scale-105 active:scale-95
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type='submit' 
          className='px-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-teal-500 to-cyan-500 
          hover:from-teal-600 hover:to-cyan-600
          dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-500 dark:hover:to-cyan-500
          text-white shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Substrate' : 'Add Substrate')}
        </button>
      </div>
    </form>
  );
}