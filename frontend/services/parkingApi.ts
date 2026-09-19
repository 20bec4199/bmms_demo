import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosInstance } from './axios';

const axiosBaseQuery =
  (): BaseQueryFn<
    string | {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async (arg) => {
    try {
      const config = typeof arg === 'string' ? { url: arg } : arg;
      const result = await axiosInstance({
        url: config.url,
        method: config.method || 'GET',
        data: config.data || config.body,
        params: config.params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const parkingApi = createApi({
  reducerPath: 'parkingApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['ParkingArea', 'ParkingSlot', 'ParkingAllocation', 'ParkingViolation'],
  endpoints: (builder) => ({
    getParkingAreas: builder.query<any, void>({
      query: () => ({ url: '/parking/areas', method: 'GET' }),
      providesTags: ['ParkingArea'],
    }),
    createParkingArea: builder.mutation({
      query: (data) => ({
        url: '/parking/areas',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ParkingArea'],
    }),
    getParkingSlots: builder.query<any, string | void>({
      query: (areaId) => ({
        url: areaId ? `/parking/slots?areaId=${areaId}` : '/parking/slots',
        method: 'GET',
      }),
      providesTags: ['ParkingSlot'],
    }),
    createParkingSlot: builder.mutation({
      query: (data) => ({
        url: '/parking/slots',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ParkingSlot', 'ParkingArea'],
    }),
    allocateSlot: builder.mutation({
      query: (data) => ({
        url: '/parking/allocations',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ParkingSlot', 'ParkingAllocation'],
    }),
    deleteParkingArea: builder.mutation({
      query: (id) => ({
        url: `/parking/areas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ParkingArea', 'ParkingSlot'],
    }),
    deleteParkingSlot: builder.mutation({
      query: (id) => ({
        url: `/parking/slots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ParkingSlot', 'ParkingArea'],
    }),
    deallocateSlot: builder.mutation({
      query: (id) => ({
        url: `/parking/allocations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ParkingSlot', 'ParkingAllocation'],
    }),
    getViolations: builder.query<any, void>({
      query: () => ({ url: '/parking/violations', method: 'GET' }),
      providesTags: ['ParkingViolation'],
    }),
    reportViolation: builder.mutation({
      query: (data) => ({
        url: '/parking/violations',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ParkingViolation'],
    }),
  }),
});

export const {
  useGetParkingAreasQuery,
  useCreateParkingAreaMutation,
  useDeleteParkingAreaMutation,
  useGetParkingSlotsQuery,
  useCreateParkingSlotMutation,
  useDeleteParkingSlotMutation,
  useAllocateSlotMutation,
  useDeallocateSlotMutation,
  useGetViolationsQuery,
  useReportViolationMutation,
} = parkingApi;
