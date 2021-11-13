<template>
    <div>
        <highcharts :options="gaugeOptions" />
        <p class="lead">Interpretation</p>
        <p>Consistency is defined as your total check divided by your total difficulty. For example, an attack with a check of 3 and a difficulty of 6 would have a consistency score of 0.5. A foundation with a check of 5 and a difficulty of 2 would have a consistency of 2.5.</p>
        <p>Your deck should aim for a minimum 1.5 consistency score.</p>
    </div>
</template>
<script>
export default {
    name: "consistency",
    props: ['chart'],
    computed: {
        gaugeOptions() {
            return {
                chart: {
                    type: 'solidgauge',
                    style: {
                        backgroundColor: 'transparent'
                    },
                    height: '50%'
                },
                title: {
                    text: "",
                },
                pane: {
                    center: ['50%', '80%'],
                    size: '150%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        shape: 'arc',
                        backgroundColor: 'transparent'
                    }
                },
                yAxis: {
                    stops: [
                        [0.33333, '#DC3545'], // red
                        [0.5, '#FFC107'], // yellow
                        [0.66666, '#28A745'], // green
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: 0,
                    tickAmount: 0,
                    labels: {
                        y: 16,
                        style: {
                            color: 'white'
                        }
                    },
                    min: 0,
                    max: 3
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Consistency',
                        data: [this.consistency],
                        dataLabels: {
                             format:
                                '<div style="text-align:center">' +
                                '<span style="font-size:25px">{y:.2f}</span><br/>' +
                                '</div>',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                ]
            }
        },
        consistency() {
            if(this.getChartData(this.chart.key)){
                return (this.getChartData(this.chart.key)['check'] / this.getChartData(this.chart.key)['difficulty'])
            }
            return 0
        }
    }
}
</script>