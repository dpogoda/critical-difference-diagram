<div align="center">
  <img width="786" height="177" src="https://user-images.githubusercontent.com/23639476/131734342-55a6934c-7b7e-45a9-8a3e-91d5331d9fb1.png" />
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
			{model: 'model4', rank: 3.0, clique: [1]},
			{model: 'model8', rank: 6.4, clique: [4]},
			{model: 'model5', rank: 3.4, clique: [2]},
			{model: 'model3', rank: 2.8, clique: [1]},
			{model: 'model6', rank: 4.5, clique: [3]},
            		{model: 'model7', rank: 5.8, clique: [4]},
		];


		let cd = new CriticalDifferenceDiagram({
			data,
			width: 400,
            		height: 300,
			fontSize: 10,
			fontFamily: 'Verdana',
			targetDiv: 'cd'
		});

		cd.draw();

	</script>
</body>
</html>
```
