export enum NotifyMessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export enum ColumnDataType {
  Text = 'text',
  Date = 'date',
  DateHour = 'dateHour',
  DateTime = 'dateTime',
  Currency = 'currency',
  File = 'file',
  Number = 'number',
  Action = 'action',
  Array = 'array',
  Boolean = 'boolean',
}

export function dataFake() {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: 'Dzung',
      address: `Ha Noi ${i + 1}`,
      dob: '1999-04-01',
      age: 6 + i,
      note:
        'Tân Lập là một xã thuộc huyện Đan Phượng, ' +
        'thành phố Hà Nội, Việt Nam. ',
    });
  }
  return data;
}

export enum SessionKey {
  UserProfile = 'KEY_USER_PROFILE',
  Menu = 'KEY_MENU',
  USER_INFO = 'BPM_USER_INFO',
  TOKEN = 'BPM_TOKEN',
  CURRENT_USERNAME = 'BPM_CURRENT_USERNAME',
  ROUTER_PENDING = 'BPM_ROUTER_PENDING',
  CURRENT_FUNCTION = 'BPM_CURRENT_FUNCTION',
  REFRESH_TOKEN = 'BPM_REFRESH_TOKEN',
  EXP_TOKEN = 'BPM_EXP_TOKEN',
  EXP_REFRESH_TOKEN = 'BPM_EXP_REFRESH_TOKEN',
}

export enum FunctionCode {
  Report = 'REPORT',
  ReportProcess = 'REPORT_PROCESS',
  ReportFreeLook = 'REPORT_CANCEL_FREELOOK',
  ReportPending = 'REPORT_PENDING',
  ReportPaymentFI = 'REPORT_PAYMENT_FI',
  Config = 'CONFIGURATION',
  ConfigEmail = 'CONFIG_EMAIL',
  ConfigApprovalAmountLevel = 'CONFIG_APPROVAL_AMOUNT_LEVEL',
  ConfigBusinessApprove = 'CONFIG_BUSINESS_APPROVE',
  ConfigRule = 'CONFIG_RULE',
  CategoryCommon = 'CATEGORY_COMMON',
  AssignPermissionForRole = 'ASSIGN_PERMISSION_TO_ROLE',
  AssignRoleForUser = 'ASSIGN_ROLE_TO_USER',
  Dashboard = 'DASHBOARD',
  History = 'HISTORY',
  HistoryClaim = 'HISTORY_CLAIM',
  CategoryManager = 'ADMIN_MANAGER',
  UserRoleManager = 'USER_ROLE_MANAGER',
  Function = 'RESOURCE_MANAGER',
  Permission = 'PERMISSIONS_MANAGER',
  Action = 'SCOPES_MANAGER',
  Role = 'ROLES_MANAGER',
  RequestManager = 'REQUEST_MANAGER',
  RequestAll = 'REQUEST_ALL',
  ShowLog = 'SHOW_LOG',
  CreateRequest = 'CREATE_REQUEST',
  RefundRequest = 'REQUEST_REFUND',
  PCMRequest = 'REQUEST_PCM',
  CollectionRequest = 'REQUEST_COLLECTION',
  CollectionClaim = 'REQUEST_CLAIM',
  User = 'USER_MANAGER',
  RestorePolicy = 'RESTORE_POLICY', //ds khôi phục hđ
  PaymentLotReverse = 'PAYMENT_LOT_REVERSE',
  ExportReport = 'EXPORT_REPORT',
  Approves = 'LIST_APPROVE',
  ListNonP2P = 'NON_P2P',
  ListP2P = 'P2P',
  Notification = 'NOTIFICATION_HEADER_RUNNING',
  Category = 'CATEGORY',
  DbCategory = 'CONFIG_DATABASE',
  ConfigDB = 'CONFIG_FUNCTION',
  BackEndDB = 'FUNCTION_QUERY',
  RequestConfig = 'REQUEST_CONFIG_ASSIGNMENT',
  ListClaim = 'CLAIM_REQUEST',
  ClaimManagement = 'CLAIM_MANAGEMENT',
  Correspondence = 'CORRESPONDENCE',
}

export enum Actions {
  Create = 'CREATE',
  Update = 'UPDATE',
  View = 'VIEW',
  Delete = 'DELETE',
  Process = 'PROCESS',
  Forward = 'FORWARD',
  Submit = 'SUBMIT',
  //col
  Approved = 'APPROVED',
  Reject = 'REJECT',
}

export enum DateFormat {
  Date = 'DD/MM/YYYY',
  DateTime = 'DD/MM/YYYY HH:mm:ss',
  Time = 'HH:mm:ss',
  Month = 'MM/YYYY',
}

export enum CalendarView {
  DatePicker = 'date',
  MonthPicker = 'month',
  YearPicker = 'year',
}

export enum ScreenType {
  Create,
  Update,
  Detail,
}

export enum FieldType {
  Text,
  TextArea,
  Date,
  // Dropdown,
  // Checkbox,
  // RadioButton,
}

//quyết định cho yêu cầu
export enum Decisions {
  Approved = 'APPROVED', //phê duyệt
  Pending = 'PENDING', //bổ xung
  Reject = 'REJECT', //từ chối
}

export enum PaymentMethodCode {
  Banking = 'BANKING',
  Cash = 'CASH',
}

export enum CardType {
  MOVIE = 'movie',
  TV_SHOW = 'tv_show',
  CAST = 'cast',
}

export const REFRESH_TOKEN_STATE = {
  COMPLETE: 'COMPLETE',
  PENDING: 'PENDING',
} as const;
export type REFRESH_TOKEN_STATE = keyof typeof REFRESH_TOKEN_STATE;
