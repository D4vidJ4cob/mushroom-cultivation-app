# SubstrateDetailResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique identifier of the substrate | [default to undefined]
**inoculationDate** | **string** | Date when substrate was inoculated | [default to undefined]
**incubationDate** | **string** | Date when substrate started incubation | [default to undefined]
**contaminationStatus** | **boolean** | Contamination status of the substrate | [default to undefined]
**grainSpawnId** | **number** | ID of the grain spawn used | [default to undefined]
**grainSpawn** | [**GrainSpawnResponseDto**](GrainSpawnResponseDto.md) |  | [default to undefined]

## Example

```typescript
import { SubstrateDetailResponseDto } from './api';

const instance: SubstrateDetailResponseDto = {
    id,
    inoculationDate,
    incubationDate,
    contaminationStatus,
    grainSpawnId,
    grainSpawn,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
