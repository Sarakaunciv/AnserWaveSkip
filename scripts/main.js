
Events.on(ClientLoadEvent, () => {
	const UISetGame = Vars.ui.settings.game;
	UISetGame.sliderPref("WaveSkipFrame", 15, 1, 120, 1, (value) => {return value + " frame";});
});

var waveSkipTime = 0;
Events.run(Trigger.update, () => {
	if (!Vars.state.isGame()) return;
	
	let WaveSkipFrame = Core.settings.getInt("WaveSkipFrame", 15);
	if (Core.input.keyDown(Binding.skipWave) && !Core.scene.hasDialog() && !Core.scene.hasField())
	{
		waveSkipTime++;
		if (waveSkipTime == WaveSkipFrame)
		{
			waveSkipTime = 0;
			Vars.logic.skipWave();
		}
	}
	else
	{
		waveSkipTime = 0;
	}
});
