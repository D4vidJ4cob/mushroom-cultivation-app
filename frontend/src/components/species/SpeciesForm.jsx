import { useFormik } from 'formik';
import { speciesSchema } from '../../schemas';
import LabelInput from '../LabelInput';

export default function SpeciesForm({
  species,
  saveSpecies,
  isEditing,
  navigate,
}) {
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: {
        name: species?.name || '',
      },
      validationSchema: speciesSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          const payload = isEditing ? { id: species.id, ...values } : values;

          // Save and get the result (which includes the ID for new records)
          const savedSpecies = await saveSpecies(payload);

          // Navigate to detail page
          if (!isEditing && savedSpecies?.id) {
            // For new records: navigate with print prompt
            navigate(`/species/${savedSpecies.id}`, {
              state: { showPrintPrompt: true },
            });
          } else if (isEditing) {
            // For edits: navigate without print prompt
            navigate(`/species/${species.id}`);
          } else {
            // Fallback: navigate to list if something went wrong
            navigate('/species');
          }
        } catch (err) {
          console.error('Failed to save species', err);
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

      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={() => navigate('/species')}
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
          data-cy="submit_species"
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
              ? 'Update Species'
              : 'Add Species'}
        </button>
      </div>
    </form>
  );
}
