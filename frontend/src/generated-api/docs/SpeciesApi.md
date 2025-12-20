# SpeciesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**speciesControllerCreateSpecies**](#speciescontrollercreatespecies) | **POST** /api/species | |
|[**speciesControllerDeleteSpeciesById**](#speciescontrollerdeletespeciesbyid) | **DELETE** /api/species/{id} | |
|[**speciesControllerGetAllSpecies**](#speciescontrollergetallspecies) | **GET** /api/species | |
|[**speciesControllerGetSpeciesById**](#speciescontrollergetspeciesbyid) | **GET** /api/species/{id} | |
|[**speciesControllerUpdateSpeciesById**](#speciescontrollerupdatespeciesbyid) | **PUT** /api/species/{id} | |

# **speciesControllerCreateSpecies**
> SpeciesResponseDto speciesControllerCreateSpecies(createSpeciesRequestDto)


### Example

```typescript
import {
    SpeciesApi,
    Configuration,
    CreateSpeciesRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeciesApi(configuration);

let createSpeciesRequestDto: CreateSpeciesRequestDto; //

const { status, data } = await apiInstance.speciesControllerCreateSpecies(
    createSpeciesRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSpeciesRequestDto** | **CreateSpeciesRequestDto**|  | |


### Return type

**SpeciesResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Create species |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **speciesControllerDeleteSpeciesById**
> speciesControllerDeleteSpeciesById()


### Example

```typescript
import {
    SpeciesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeciesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.speciesControllerDeleteSpeciesById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Delete species |  -  |
|**404** | Species not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **speciesControllerGetAllSpecies**
> object speciesControllerGetAllSpecies()


### Example

```typescript
import {
    SpeciesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeciesApi(configuration);

const { status, data } = await apiInstance.speciesControllerGetAllSpecies();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**object**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all species |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **speciesControllerGetSpeciesById**
> SpeciesResponseDto speciesControllerGetSpeciesById()


### Example

```typescript
import {
    SpeciesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeciesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.speciesControllerGetSpeciesById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**SpeciesResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get species by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | Species not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **speciesControllerUpdateSpeciesById**
> SpeciesResponseDto speciesControllerUpdateSpeciesById(updateSpeciesRequestDto)


### Example

```typescript
import {
    SpeciesApi,
    Configuration,
    UpdateSpeciesRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeciesApi(configuration);

let id: number; // (default to undefined)
let updateSpeciesRequestDto: UpdateSpeciesRequestDto; //

const { status, data } = await apiInstance.speciesControllerUpdateSpeciesById(
    id,
    updateSpeciesRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSpeciesRequestDto** | **UpdateSpeciesRequestDto**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**SpeciesResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update species |  -  |
|**400** | Invalid input data |  -  |
|**404** | Species not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

