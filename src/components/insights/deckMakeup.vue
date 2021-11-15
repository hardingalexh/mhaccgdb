<template>
    <div>
        <highcharts :options="pieChartOptions" />
        <p class="lead">Interpretation</p>
        <p>A simple breakdown of the percent of each card type in your deck. The MHA CCG Rulebook recommends 70% of your cards be non-attacks and 30% of your cards attacks.</p>
    </div>
</template>
<script>
export default {
    name: 'deckMakeup',
    props: ['chart'],
    data() {
        return {
            cardColors: {
                'Action': 'rgb(40,90,137)',
                'Attack': 'rgb(182, 57, 33)',
                'Asset': 'rgb(33, 67, 40)',
                'Character': 'rgb(255, 255, 255)',
                'Foundation': 'rgb(120, 120, 120)'
            }
        }
    },
    computed: {
        pieChartOptions(){
            return {
                chart: {
                    plotBackgroundColor: 'transparent',
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                labels: {
                    style: {
                        color: "white"
                    }
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            distance: -50,
                            style: {
                                textOutline: false
                            }
                        }
                    }
                },
                 tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                series: {
                    name: 'Deck Makeup',
                    data: this.pieChartSeries
                }
            }
        },
        pieChartSeries(){
            if(this.getChartData(this.chart.key)){
                return Object.keys(this.getChartData(this.chart.key)).map(cat => {
                    const cardCount = this.getChartData(this.chart.key)[cat].reduce((acc, card) => acc += card.quantity, 0)
                    const totalCardCount = this.getFilter('deck').length
                    return {
                        name: cat,
                        y: (cardCount * 100) / totalCardCount,
                        color: this.cardColors[cat]
                    }
                })
            }
            return []
        }
    }
}
</script>