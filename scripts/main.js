// ========== Init ==========
initSpellControls();
renderAttacks();
renderHabilidades();
renderSpellLevels();
wireClassFeaturesSync();
wireAutoFill();
load();
applyCanvasHeight();
watchCanvasResize();
// Re-render após load() (o estado restaurado pode ter mudado classe/nível)
if (typeof renderClassFeatures === 'function') renderClassFeatures();
if (typeof autoFillDerivedFields === 'function') autoFillDerivedFields();
wireSave();
