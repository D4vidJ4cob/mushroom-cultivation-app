import { useFormik } from 'formik';
import { motherCultureSchema } from '../../schemas';
import LabelInput from '../LabelInput';
import LabelSelect from '../LabelSelect';

const formatDateForInput = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return date.split('T')[0];
};

export default function MotherCultureForm({
  motherCulture,
  species,
  saveMotherCulture,
  isEditing,
  navigate,
}) {
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: {
        name: motherCulture?.name || '',
        speciesId: motherCulture?.speciesId || '',
        inoculationDate: formatDateForInput(motherCulture?.inoculationDate),
        characteristic: motherCulture?.characteristic || '',
      },
      validationSchema: motherCultureSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          const payload = isEditing
            ? { id: motherCulture.id, ...values }
            : values;

          // Save and get the result (which includes the ID for new records)
          const savedMotherCulture = await saveMotherCulture(payload);

          // Navigate to detail page
          if (!isEditing && savedMotherCulture?.id) {
            // For new records: navigate wit,h print prompt
            navigate(`/mother-cultures/${savedMotherCulture.id}`, {
              state: { showPrintPrompt: true },
            });
          } else if (isEditing) {
            // For edits: navigate without print prompt
            navigate(`/mother-cultures/${motherCulture.id}`);
          } else {
            // Fallback: navigate to list if something went wrong
            navigate('/mother-cultures');
          }
        } catch (err) {
          console.error('Failed to save mother culture', err);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LabelInput
        label="Name"
        type="text"
        placeholder="name"
        {...getFieldProps('name')}
        touched={touched.name}
        error={errors.name}
        disabled={isSubmitting}
        data-cy="name_input"
      />

      <LabelSelect
        label="Species"
        placeholder="Select a species"
        options={species}
        {...getFieldProps('speciesId')}
        touched={touched.speciesId}
        error={errors.speciesId}
        disabled={isSubmitting}
        data-cy="species_select"
      />

      <LabelInput
        label="Inoculation Date"
        type="date"
        placeholder="inoculationDate"
        {...getFieldProps('inoculationDate')}
        touched={touched.inoculationDate}
        error={errors.inoculationDate}
        disabled={isSubmitting}
        data-cy="inoculationDate_input"
      />

      <LabelInput
        label="Characteristic"
        type="text"
        placeholder="characteristic"
        {...getFieldProps('characteristic')}
        touched={touched.characteristic}
        error={errors.characteristic}
        disabled={isSubmitting}
        data-cy="character_input"
      />

      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={() => navigate('/mother-cultures')}
          className="px-6 py-3 rounded-xl font-semibold
          bg-white/50 dark:bg-gray-900/50 
          text-gray-700 dark:text-gray-300
          border-2 border-gray-200 dark:border-gray-700
          hover:border-gray-300 dark:hover:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-800
          transform hover:scale-105 active:scale-95
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-semibold
          bg-linear-to-r from-teal-500 to-cyan-500 
          hover:from-teal-600 hover:to-cyan-600
          dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-500 dark:hover:to-cyan-500
          text-white shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          data-cy="submit_motherCulture"
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
              ? 'Update Mother Culture'
              : 'Add Mother Culture'}
        </button>
      </div>
    </form>
  );
}
