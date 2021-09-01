export default class CriticalDifferenceDiagram {
	constructor({
		data,
		width,
		height,
		fontSize,
		fontFamily,
		targetDiv
	}) {
		this.data = data;
		this.width = width;
		this.height = height;
		this.fontSize = fontSize;
		this.fontFamily = fontFamily;
		this.targetDiv = targetDiv;
		this.n = this.data.length;

		this.b = this.fontSize + 5;
		this.t = this.fontSize;
		this.s = 5;
		this.cliqueRowSize = 5.;
		this.rowSize = this.fontSize;
		this.numberLeftRows = 0;
		this.numberRightRows = 0;

		this.svgns = "http://www.w3.org/2000/svg";
		this.svg   = document.createElementNS(this.svgns, "svg");
		this.svg.setAttribute("height", this.height);
		this.svg.setAttribute("width" , this.width);
		this.svg.setAttribute("xmlns" , this.svgns);
		let target = document.getElementById(this.targetDiv);
		target.appendChild(this.svg);

		this.sortData();
		this.numberOfCliques = this.getNumberOfCliques();
		this.numberOfTicks   = this.data.length;

		if(this.height) {
			this.numberOfCliques
			this.numberLeft
			this.numberRight 
			let countLeft = 0;
			this.data.forEach(d => d.rank < ((this.numberOfTicks + 1) / 2) ? ++countLeft : countLeft);
			let rows = Math.max(countLeft, this.data.length - countLeft);
			this.oldFontSize = this.fontSize;
			this.fontSize = (this.height - (this.b - this.t)) / (this.numberOfCliques * (this.cliqueRowSize + 2) + rows);
			this.rowSize = this.fontSize;
			this.cliqueRowSize = this.cliqueRowSize / this.oldFontSize * this.fontSize
			this.b = this.fontSize + 5;
			this.t = this.fontSize;
		}

		this.longestText     = this.getLongestText();
	}

	getTextWidth(inputText) {
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");
		context.font = `${this.fontSize}px ${this.fontFamily}`;
		let width = context.measureText(inputText).width;
		return Math.ceil(width);
	}

	sortData() {
		this.data.sort((a,b) => {
			a = a.rank;
			b = b.rank;
			if(a > this.n / 2. && b > this.n / 2.) {
				return b - a;
			} else {
				return a - b;
			}
		});
	}

	getLongestText() {
		let longest = 0;
		this.data.forEach(d => {
			longest = Math.max(this.getTextWidth(d.model), longest);
		});
		return longest * 1.2;
	}

	getNumberOfCliques() {
		let cliques = [];
		this.data.forEach(d => {
			d.clique.forEach(clique => {
				if(!cliques[clique]) { 
					cliques[clique] = 1; 
				} else {
					cliques[clique]++;
				}
			});
		});
		return cliques.reduce((acc,cur) => cur > 1 ? ++acc : acc, 0);
	}

	drawLine(x1, y1, x2, y2, thick) {
		let line = document.createElementNS(this.svgns, "line");
		line.setAttribute("x1", x1);
		line.setAttribute("y1", y1);
		line.setAttribute("x2", x2); 
		line.setAttribute("y2", y2);
		line.setAttribute("style", "stroke:#000; stroke-width: 1");
		if(thick) {
			line.setAttribute("style", "stroke:#000; stroke-width: 2");
		}
		this.svg.appendChild(line);
	}

	drawText(inputText, x, y, alignment) {
		let text = document.createElementNS(this.svgns, "text");
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.setAttribute("fill", "black");
		text.setAttribute("font-size", this.fontSize);
		text.setAttribute("font-family", this.fontFamily);
		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("text-anchor", alignment);
		text.innerHTML = inputText;
		this.svg.appendChild(text);
	}

	drawModelText(modelName, direction, y) {

		let w = this.width;
		let x;
		if(direction == -1) {
			x = this.longestText - this.getTextWidth(modelName) - this.s;
		} else {
			x = w - this.longestText + this.s;
		}

		this.drawText(modelName, x, y, 'auto');

	}	

	drawTicks(data) {
		let spacing = (this.width - 2 * this.longestText) * 1.0 / (this.numberOfTicks - 1);
		for(let i = 0; i < this.numberOfTicks; i++) {

			let x = i * spacing + this.longestText;
			let y = this.fontSize / 2;
			this.drawText(i + 1, x, y, 'middle');
		
			let y1 = this.b;
			let y2 = this.t;
			this.drawLine(x, y1, x, y2);
		}
	}

	drawModelLine(datum) {
		let m = this.longestText;
		let rank    = datum.rank;
		let rankX   = (rank - 1) / (this.numberOfTicks - 1) * ( this.width - m * 2 ) + m;
		if(rank < (this.numberOfTicks + 1) / 2) {
			let y = this.numberOfCliques * this.cliqueRowSize + this.cliqueRowSize + this.b + this.rowSize * this.numberLeftRows + this.rowSize;
			this.drawLine(rankX, this.b, rankX, y);
			this.drawLine(rankX, y,  m - this.s, y);
			this.drawModelText(datum.model, -1, y);
			return -1;
		} else {
			let y = this.numberOfCliques * this.cliqueRowSize + this.cliqueRowSize + this.b + this.rowSize * this.numberRightRows + this.rowSize;
			this.drawLine(rankX, this.b, rankX, y);
			this.drawLine(rankX, y,  m + (this.width -m * 2) + this.s, y);
			this.drawModelText(datum.model, 1, y);
			return 1;
		}
	}

	drawCliques() {
		let rowSize = this.cliqueRowSize;
		let numberOfCliques = this.numberOfCliques;
		let cliques = {};
		let m       = this.longestText;
		this.data.forEach(d => {

			d.clique.forEach(cliqueNo => {
				let clique = cliques[cliqueNo];
				let rank   = d.rank;

				if(!clique) {
					cliques[cliqueNo] = { min: rank, max: rank, numMembers: 1 };
					clique = cliques[cliqueNo];
				} else {
					
					clique.numMembers++;

					if(rank < clique.min) {
						clique.min = rank;
					}

					if(rank > clique.max) {
						clique.max = rank;
					}

				}
			});
		});

		let numberDrawn = 1;

		for (const [key, value] of Object.entries(cliques)) {
			if(value.numMembers > 1) {
				let x1 = (value.min - 1) / (this.numberOfTicks - 1) * ( this.width - m * 2 ) + m;
				let x2 = (value.max - 1) / (this.numberOfTicks - 1) * ( this.width - m * 2 ) + m;
				let y  = this.b + rowSize * numberDrawn;
				this.drawLine(x1 - 2, y, x2 + 2, y, "thick");
				numberDrawn++;
			}
		}
	}

	drawModelLinesAndTexts() {
		this.data.forEach(d => {
			let result = this.drawModelLine(d);
			if(result == -1) {
				this.numberLeftRows++;
			} else {
				this.numberRightRows++;
			}
		})
	}

	drawXAxis() {
		let x1 = this.longestText;
		let y1 = this.b;
		let x2 = this.width - this.longestText;
		let y2 = this.b;
		this.drawLine(x1,y1,x2,y2);
	}

	draw() {
		this.drawXAxis();
		this.drawTicks();
		this.drawCliques();
		this.drawModelLinesAndTexts();
	}
}

window.CriticalDifferenceDiagram = CriticalDifferenceDiagram;