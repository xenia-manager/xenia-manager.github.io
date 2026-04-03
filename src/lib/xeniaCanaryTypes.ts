export interface XeniaCanaryAsset {
  name: string;
  url: string;
}

export interface XeniaCanaryChangelog {
  title: string;
  changes?: string;
}

export interface XeniaCanaryRelease {
  tag_name: string;
  target_commitish: string;
  published_at: string;
  url: string;
  commit_url: string;
  changelog: XeniaCanaryChangelog;
  assets: XeniaCanaryAsset[];
}
