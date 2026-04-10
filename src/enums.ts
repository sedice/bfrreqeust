/**
 * @description: Request result set
 */
export const ResultEnum = {
  SUCCESS: 0,
  ERROR: -1,
  TIMEOUT: 401,
  TYPE: "success",
} as const;

export type ResultEnum = (typeof ResultEnum)[keyof typeof ResultEnum];

/**
 * @description: request method
 */
export const RequestEnum = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type RequestEnum = (typeof RequestEnum)[keyof typeof RequestEnum];

/**
 * @description:  contentType
 */
export const ContentTypeEnum = {
  // json
  JSON: "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED: "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA: "multipart/form-data;charset=UTF-8",
} as const;

export type ContentTypeEnum = (typeof ContentTypeEnum)[keyof typeof ContentTypeEnum];
