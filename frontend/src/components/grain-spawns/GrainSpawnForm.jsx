import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { grainSpawnSchema } from '../../schemas';
import LabelSelect from '../LabelSelect';
import LabelInput from '../LabelInput';
import LabelRadio from '../LabelRadio';

const formatDateForInput = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return date.split('T')[0];
};

export default function GrainSpawnForm({
  grainSpawn,
  species,
  motherCultures,
  liquidCultures,
  saveGrainSpawn,
  isEditing,
}) {
  const navigate = useNavigate();

  const {values, handleBlur, handleSubmit, touched, errors, setFieldValue, getFieldProps, isSubmitting} = useFormik({
    initialValues: {
      speciesId: grainSpawn?.speciesId || '',
      inoculationDate: formatDateForInput(grainSpawn?.inoculationDate),
      characteristic: grainSpawn?.characteristic || '',
      shaken: grainSpawn?.shaken ?? false,

      sourceType: grainSpawn?.motherCultureId ? 
        'motherCulture' : grainSpawn?.liquidCultureId ? 'liquidCulture' : '',

      motherCultureId: grainSpawn?.motherCultureId || '',
      liquidCultureId: grainSpawn?.liquidCultureId || '',
    },
    validationSchema: grainSpawnSchema,
    enableReinitialize: true,
    
    onSubmit: async (values) => {
      try {
        const data = {
          speciesId: values.speciesId,
          inoculationDate: values.inoculationDate,
          characteristic: values.characteristic,
          shaken: values.shaken,
          ...(values.sourceType === 'motherCulture' && { 
            motherCultureId: values.motherCultureId, 
          }),
          ...(values.sourceType === 'liquidCulture' && { 
            liquidCultureId: values.liquidCultureId, 
          }),
        };

        const payload = isEditing ? { id: grainSpawn.id, ...data } : data;
        
        await saveGrainSpawn(payload);
        navigate('/grain-spawns');
      } catch (err) {
        console.error('Failed to save grain spawn', err);
      }
    },
  });

  const filteredMotherCultures = motherCultures?.filter(
    (mc) => mc.speciesId === parseInt(values.speciesId),
  ) || [];
  
  const filteredLiquidCultures = liquidCultures?.filter(
    (lc) => lc.speciesId === parseInt(values.speciesId),
  ) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LabelSelect
        label="Species"
        placeholder="Select a species"
        options={species}
        {...getFieldProps('speciesId')}
        touched={touched.speciesId}
        error={errors.speciesId}
        disabled={isSubmitting}
      />

      <LabelInput
        label="Inoculation Date"
        type="date"
        placeholder="inoculationDate"
        {...getFieldProps('inoculationDate')}
        touched={touched.inoculationDate}
        error={errors.inoculationDate}
        disabled={isSubmitting}
      />

      <LabelRadio
        label="Has the grain spawn been shaken?"
        name="shaken"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={values.shaken}
        onChange={setFieldValue}
        onBlur={handleBlur}
        touched={touched.shaken}
        error={errors.shaken}
        disabled={isSubmitting}
      />

      <LabelRadio
        label="Source Type"
        name="sourceType"
        options={[
          { value: 'motherCulture', label: 'Mother Culture' },
          { value: 'liquidCulture', label: 'Liquid Culture' },
        ]}
        value={values.sourceType}
        onChange={setFieldValue}
        onBlur={handleBlur}
        touched={touched.sourceType}
        error={errors.sourceType}
        disabled={isSubmitting}
      />

      {/* Mother Culture dropdown */}
      {values.sourceType === 'motherCulture' && (
        <LabelSelect
          label="Mother Culture"
          placeholder="Select a mother culture"
          options={filteredMotherCultures.map((mc) => ({
            id: mc.id,
            name: `${mc.name} (ID: ${mc.id})`,
          }))}
          {...getFieldProps('motherCultureId')}
          touched={touched.motherCultureId}
          error={errors.motherCultureId}
          disabled={isSubmitting}
        />
      )}

      {/* Liquid Culture dropdown */}
      {values.sourceType === 'liquidCulture' && (
        <LabelSelect
          label="Liquid Culture"
          placeholder="Select a liquid culture"
          options={filteredLiquidCultures.map((lc) => ({
            id: lc.id,
            name: `${lc.name} (ID: ${lc.id})`,
          }))}
          {...getFieldProps('liquidCultureId')}
          touched={touched.liquidCultureId}
          error={errors.liquidCultureId}
          disabled={isSubmitting}
        />
      )}

      <LabelInput
        label="Characteristic"
        type="text"
        placeholder="characteristic"
        {...getFieldProps('characteristic')}
        touched={touched.characteristic}
        error={errors.characteristic}
        disabled={isSubmitting}
      />
      
      <div className='flex justify-end gap-3 mt-8'>
        <button 
          type='button' 
          onClick={() => navigate('/grain-spawns')}
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
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Grain Spawn' : 'Add Grain Spawn')}
        </button>
      </div>
    </form>
  );
}