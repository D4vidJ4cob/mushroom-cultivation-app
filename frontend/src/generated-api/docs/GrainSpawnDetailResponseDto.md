# GrainSpawnDetailResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique identifier of the grain spawn | [default to undefined]
**inoculationDate** | **string** | Date when grain spawn was inoculated | [default to undefined]
**contaminationStatus** | **boolean** | Contamination status of the grain spawn | [default to undefined]
**shaken** | **boolean** | Whether the grain spawn has been shaken | [default to undefined]
**motherCultureId** | **object** | ID of the mother culture used | [default to undefined]
**liquidCultureId** | **object** | ID of the liquid culture used | [default to undefined]
**species** | [**SpeciesResponseDto**](SpeciesResponseDto.md) |  | [default to undefined]
**characteristic** | **object** | Extra characteristics of the grain spawn | [default to undefined]

## Example

```typescript
import { GrainSpawnDetailResponseDto } from './api';

const instance: GrainSpawnDetailResponseDto = {
    id,
    inoculationDate,
    contaminationStatus,
    shaken,
    motherCultureId,
    liquidCultureId,
    species,
    characteristic,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
