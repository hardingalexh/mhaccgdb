<template>
    <div>
        <highcharts :options="pieChartOptions" />
    </div>
</template>
<script>
export default {
    name: 'deckMakeup',
    props: ['chart'],
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
                         dataLabels: {
                            color: 'white'
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
                        y: (cardCount * 100) / totalCardCount
                    }
                })
            }
            return []
        }
    }
}
</script>