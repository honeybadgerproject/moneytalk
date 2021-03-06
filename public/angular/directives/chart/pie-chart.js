angular.module('app')
    .directive('pieDonut', function(){
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                controller: function($scope) {
                    if($('#donut-chart')[0]){
                        $.plot('#donut-chart', data, {
                            series: {
                                pie: {
                                    innerRadius: 0.5,
                                    show: true,
                                    stroke: { 
                                        width: 2,
                                    },
                                },
                            },
                            legend: {
                                container: '.flc-donut',
                                backgroundOpacity: 0.5,
                                noColumns: 0,
                                backgroundColor: "white",
                                lineWidth: 0
                            },
                            grid: {
                                hoverable: true,
                                clickable: true
                            },
                            tooltip: true,
                            tooltipOpts: {
                                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                                shifts: {
                                    x: 20,
                                    y: 0
                                },
                                defaultTheme: false,
                                cssClass: 'flot-tooltip'
                            }

                        });
                    }
                },
                link: function(scope, element, attrs){
                    // var pieData = [
                    //     {data: 1, color: '#F44336', label: 'Toyota'},
                    //     {data: 2, color: '#03A9F4', label: 'Nissan'},
                    //     {data: 3, color: '#8BC34A', label: 'Hyundai'},
                    //     {data: 4, color: '#FFEB3B', label: 'Scion'},
                    //     {data: 4, color: '#009688', label: 'Daihatsu'},
                    // ];

                    // /* Pie Chart */

                    // if($('#pie-chart')[0]){
                    //     $.plot('#pie-chart', pieData, {
                    //         series: {
                    //             pie: {
                    //                 show: true,
                    //                 stroke: { 
                    //                     width: 2,
                    //                 },
                    //             },
                    //         },
                    //         legend: {
                    //             container: '.flc-pie',
                    //             backgroundOpacity: 0.5,
                    //             noColumns: 0,
                    //             backgroundColor: "white",
                    //             lineWidth: 0
                    //         },
                    //         grid: {
                    //             hoverable: true,
                    //             clickable: true
                    //         },
                    //         tooltip: true,
                    //         tooltipOpts: {
                    //             content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                    //             shifts: {
                    //                 x: 20,
                    //                 y: 0
                    //             },
                    //             defaultTheme: false,
                    //             cssClass: 'flot-tooltip'
                    //         }

                    //     });
                    // }
                }
            }
        })