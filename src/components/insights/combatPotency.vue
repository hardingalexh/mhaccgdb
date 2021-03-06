<template>
    <div>
        <highcharts :options="spiderChartOptions"></highcharts>
        <p class="lead">Interpretation</p>
        <p>
        This radar chart creates a polygon for each zone - low, mid and high. For each zone, this polygon maps 5 stats:
            <br /><strong>Average Speed</strong>:<br /> The average speed of attacks in this zone (higher is better)
            <br /><strong>Average Damage</strong>:<br /> The average damage of attacks in this zone (higher is better)
            <br /><strong>Average Difficulty</strong>:<br /> The average difficulty of attacks in this zone (lower is better)
            <br /><strong>Attack Frequency</strong>:<br /> The percentage of attacks in this zone, scaled to 10. For example, if 40% of your attacks were "low," it would show as 4.
            <br /><strong>Average Block</strong>:<br /> The average modifier of blocks in this zone (lower is better)
            <br /><strong>Block Frequency</strong>:<br /> The percentage of blocks in this zone, scaled to 10. For example, if 40% of your blocks were "low," it would show as 4.
        </p>
    </div>
</template>
<script>
export default {
    name: "combatPotency",
    props: ['chart'],
    computed: {
        spiderChartOptions() {
            return {
                chart: {
                    polar: true
                },
                legend: {
                    itemStyle: {
                        color: "white"
                    }
                },
                series: this.spiderChartSeries,
                title: {
                    text: '',
                    style: {
                        color: "white"
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: {point.y:.2f}'
                },
                xAxis: {
                    categories: ['Avg Speed', 'Avg Damage', 'Avg Difficulty', 'Attack Frequency', 'Avg Block', 'Block Frequency'],
                    tickmarkPlacement: 'on',
                    labels: {
                        style: {
                            color: "white",
                            textOutline: false
                        }
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            style: {
                                textOutline: false
                            }
                        }
                    }
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    tickmarkPlacement: 'on',
                    min: 0,
                    max: 10,
                    labels: {
                        style: {
                            color: "white"
                        },
                    }
                }
            }
        },
        spiderChartSeries(){
            if(this.getChartData(this.chart.key)){
                return [{
                    'name': 'Low',
                    'data': this.getChartData(this.chart.key)['low'],
                    'color': "rgb(249, 229, 79)",
                    'pointPlacement': 'on',
                },{
                    'name': 'Mid',
                    'data': this.getChartData(this.chart.key)['mid'],
                    'color': "rgb(227, 145, 66)",
                    'pointPlacement': 'on'
                },{
                    'name': 'High',
                    'data': this.getChartData(this.chart.key)['high'],
                    'color': "rgb(190, 50, 35)",
                    'pointPlacement': 'on'
                },
                // {
                //     'name': 'Total',
                //     'data': this.getChartData(this.chart.key)['total'],
                //     'color': 'black',
                //     'pointPlacement': 'on'
                // },
                ]
            }
            return []
        }
    }
}
</script>