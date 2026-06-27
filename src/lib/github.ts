import { OUTDATED_SETTINGS_ISSUE, MISSING_GAME_ENTRY_ISSUE, INVALID_GAME_ENTRY_ISSUE } from "@/lib/constants";

export function getOutdatedSettingsIssueUrl(gameId: string, gameTitle: string) {
  const params = new URLSearchParams();
  params.set("title_id", gameId);
  params.set("game_title", gameTitle);
  return `${OUTDATED_SETTINGS_ISSUE}&${params.toString()}`;
}

export function getMissingGameEntryUrl() {
  return MISSING_GAME_ENTRY_ISSUE;
}

export function getInvalidGameEntryUrl(gameId: string, gameTitle: string) {
  const params = new URLSearchParams();
  params.set("title_id", gameId);
  params.set("game_title", gameTitle);
  return `${INVALID_GAME_ENTRY_ISSUE}&${params.toString()}`;
}
