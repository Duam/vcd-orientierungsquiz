// Radar Chart für die 7 Eigenschaften
export class RadarChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 80;
        
        // Die 7 Eigenschaften
        this.labels = [
            'Frontkämpfer*in',
            'Strateg*in', 
            'Möglichmacher*in',
            'Netzwerker*in',
            'Visionär*in',
            'Diplomat*in',
            'Macher*in'
        ];
        
        // Kurze Labels für bessere Darstellung
        this.shortLabels = [
            'Frontkämpfer*in',
            'Strateg*in', 
            'Möglichmacher*in',
            'Netzwerker*in',
            'Visionär*in',
            'Diplomat*in',
            'Macher*in'
        ];
    }

    // Zeichnet das Radar-Chart
    drawChart(data) {
        this.clearCanvas();
        this.drawGrid();
        this.drawData(data);
        this.drawLabels();
    }

    // Leert den Canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Zeichnet das Gitter
    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        
        // Konzentrische Kreise
        for (let i = 1; i <= 5; i++) {
            const radius = (this.radius * i) / 5;
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        // Radiale Linien
        for (let i = 0; i < this.labels.length; i++) {
            const angle = (2 * Math.PI * i) / this.labels.length - Math.PI / 2;
            const x = this.centerX + this.radius * Math.cos(angle);
            const y = this.centerY + this.radius * Math.sin(angle);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    // Zeichnet die Daten
    drawData(data) {
        if (!data || data.length !== this.labels.length) return;

        // Berechne die Punkte
        const points = [];
        for (let i = 0; i < this.labels.length; i++) {
            const angle = (2 * Math.PI * i) / this.labels.length - Math.PI / 2;
            const value = data[i] / 100; // Normalisiere auf 0-1
            const x = this.centerX + (this.radius * value) * Math.cos(angle);
            const y = this.centerY + (this.radius * value) * Math.sin(angle);
            points.push({ x, y });
        }

        // Zeichne den gefüllten Bereich
        this.ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();

        // Zeichne die Umrisslinie
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        // Zeichne die Datenpunkte
        this.ctx.fillStyle = '#3498db';
        points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    // Zeichnet die Labels
    drawLabels() {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '12px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = 0; i < this.shortLabels.length; i++) {
            const angle = (2 * Math.PI * i) / this.shortLabels.length - Math.PI / 2;
            const labelRadius = this.radius + 25;
            const x = this.centerX + labelRadius * Math.cos(angle);
            const y = this.centerY + labelRadius * Math.sin(angle);
            
            this.ctx.fillText(this.shortLabels[i], x, y);
        }
    }

    // Zeichnet Werte-Labels (0, 20, 40, 60, 80, 100)
    drawValueLabels() {
        this.ctx.fillStyle = '#7f8c8d';
        this.ctx.font = '10px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = 0; i <= 5; i++) {
            const value = i * 20;
            const radius = (this.radius * i) / 5;
            this.ctx.fillText(value.toString(), this.centerX + radius + 15, this.centerY);
        }
    }
}
