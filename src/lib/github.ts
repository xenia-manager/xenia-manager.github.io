export function getOutdatedSettingsIssueUrl(gameId: string, gameTitle: string) {
  const base =
    "https://github.com/xenia-manager/optimized-settings/issues/new?template=outdated_settings.yml";
  const params = new URLSearchParams();
  params.set("title_id", gameId);
  params.set("game_title", gameTitle);
  return `${base}&${params.toString()}`;
}
