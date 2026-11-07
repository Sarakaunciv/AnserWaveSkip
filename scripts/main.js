
Events.on(ClientLoadEvent, () => {
	const UISetGame = Vars.ui.settings.game;
	UISetGame.sliderPref("WaveSkipFrame", 15, 1, 120, 1, (value) => {return value + " frame";});
	UISetGame.sliderPref("WaveTimeAdd", 5, 1, 60, 1, (value) => {return value + " min";});
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
			if (Core.input.keyDown(Binding.boost))
			{
				let WaveTimeAdd = Core.settings.getInt("WaveTimeAdd", 5);
				waveSkipTime = 0;
				Vars.state.wavetime += 3600 * WaveTimeAdd;
			}
			else
			{
				waveSkipTime = 0;
				Vars.logic.skipWave();
			}
		}
	}
	else
	{
		waveSkipTime = 0;
	}
});
