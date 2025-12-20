# GrainSpawnsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**grainSpawnControllerCreateGrainSpawn**](#grainspawncontrollercreategrainspawn) | **POST** /api/grain-spawns | |
|[**grainSpawnControllerDeleteGrainSpawn**](#grainspawncontrollerdeletegrainspawn) | **DELETE** /api/grain-spawns/{id} | |
|[**grainSpawnControllerGetAllGrainSpawns**](#grainspawncontrollergetallgrainspawns) | **GET** /api/grain-spawns | |
|[**grainSpawnControllerGetGrainSpawnById**](#grainspawncontrollergetgrainspawnbyid) | **GET** /api/grain-spawns/{id} | |
|[**grainSpawnControllerUpdateGrainSpawnById**](#grainspawncontrollerupdategrainspawnbyid) | **PUT** /api/grain-spawns/{id} | |

# **grainSpawnControllerCreateGrainSpawn**
> GrainSpawnDetailResponseDto grainSpawnControllerCreateGrainSpawn(createGrainSpawnRequestDto)


### Example

```typescript
import {
    GrainSpawnsApi,
    Configuration,
    CreateGrainSpawnRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new GrainSpawnsApi(configuration);

let createGrainSpawnRequestDto: CreateGrainSpawnRequestDto; //

const { status, data } = await apiInstance.grainSpawnControllerCreateGrainSpawn(
    createGrainSpawnRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createGrainSpawnRequestDto** | **CreateGrainSpawnRequestDto**|  | |


### Return type

**GrainSpawnDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Create grain spawn |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grainSpawnControllerDeleteGrainSpawn**
> grainSpawnControllerDeleteGrainSpawn()


### Example

```typescript
import {
    GrainSpawnsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GrainSpawnsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.grainSpawnControllerDeleteGrainSpawn(
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
|**204** | Delete grain spawn |  -  |
|**404** | Grain spawn not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grainSpawnControllerGetAllGrainSpawns**
> GrainSpawnsListResponseDto grainSpawnControllerGetAllGrainSpawns()


### Example

```typescript
import {
    GrainSpawnsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GrainSpawnsApi(configuration);

const { status, data } = await apiInstance.grainSpawnControllerGetAllGrainSpawns();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GrainSpawnsListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all grain spawns |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grainSpawnControllerGetGrainSpawnById**
> GrainSpawnDetailResponseDto grainSpawnControllerGetGrainSpawnById()


### Example

```typescript
import {
    GrainSpawnsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GrainSpawnsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.grainSpawnControllerGetGrainSpawnById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**GrainSpawnDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get grain spawn by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | Grain sapwn not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grainSpawnControllerUpdateGrainSpawnById**
> GrainSpawnDetailResponseDto grainSpawnControllerUpdateGrainSpawnById(body)


### Example

```typescript
import {
    GrainSpawnsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GrainSpawnsApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.grainSpawnControllerUpdateGrainSpawnById(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**GrainSpawnDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update grain spawn |  -  |
|**400** | Invalid input data |  -  |
|**404** | Grain spawn not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

