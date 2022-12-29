export interface UserInfo {
  username: string
  password: string
  auth: number
  status: string
  exp_date: string
  is_trial: string
  active_cons: string
  created_at: string
  max_connections: string
  allowed_output_formats: string[]
}

export interface ServerInfo {
  url: string
  port: string
  https_port: string
  server_protocol: string
}

export interface Category {
  category_id: string
  category_name: string
  parent_id: number
}

export interface Channel {
  num: number
  name: string
  stream_type: string
  type_name: string
  stream_id: string
  stream_icon: string | null
  epg_channel_id: string | null
  added: string
  category_name: string
  category_id: string
  series_no: string | null
  live: string
  container_extension: string | null
  custom_sid: string
  tv_archive: number
  direct_source: string
  tv_archive_duration: number
}

export interface XtreamCodesData {
  user_info: UserInfo
  server_info: ServerInfo
  categories: {
    [key: string]: Category[]
  }
  available_channels: {
    [key: string]: Channel
  }
}
