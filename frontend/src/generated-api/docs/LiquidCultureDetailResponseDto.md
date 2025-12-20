# LiquidCultureDetailResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique identifier of the culture | [default to undefined]
**name** | **string** | Name of the culture | [default to undefined]
**inoculationDate** | **string** | Date when culture was inoculated | [default to undefined]
**contaminationStatus** | **boolean** | Contamination status of the culture | [default to undefined]
**speciesId** | **number** | Unique identifier of the species | [default to undefined]
**characteristic** | **object** | Extra information about the culture | [default to undefined]
**species** | [**Array&lt;SpeciesResponseDto&gt;**](SpeciesResponseDto.md) |  | [default to undefined]

## Example

```typescript
import { LiquidCultureDetailResponseDto } from './api';

const instance: LiquidCultureDetailResponseDto = {
    id,
    name,
    inoculationDate,
    contaminationStatus,
    speciesId,
    characteristic,
    species,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
