## CD diagram 

Simple JS library to create a CD diagram in SVG format

<div align="center">
  <img src="https://raw.githubusercontent.com/dpogoda/critical-difference-diagram/main/example/example.svg" />
</div>

## Example usage:

```
<!DOCTYPE html>
<head>
	<style>
		html, body { margin: 0; padding: 0; }
	</style>
	<script src="../dist/critical-difference-diagram-1.0.0.js"></script>
</head>
<body>
	<div id="cd"></div>
	<script>

		let data = [
			{model: 'model1', rank: 1.2, clique: [0]},
			{model: 'model2', rank: 1.5, clique: [0]},
			{model: 'model4', rank: 3.0, clique: [1,5]},
			{model: 'model8', rank: 6.4, clique: [4]},
			{model: 'model5', rank: 3.4, clique: [2,5]},
			{model: 'model3', rank: 2.8, clique: [1]},
			{model: 'model6', rank: 4.5, clique: [3]},
			{model: 'model7', rank: 5.8, clique: [4]},
		];

		let cd = new CriticalDifferenceDiagram({
			data,
			width: 400,
			fontSize: 10,
			fontFamily: 'Verdana',
			targetDiv: 'cd'
		});

		cd.draw();

	</script>
</body>
</html>
```
