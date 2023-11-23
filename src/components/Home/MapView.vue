<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Root, color } from '@amcharts/amcharts5'
import { MapChart, ZoomControl, MapPolygonSeries, MapPolygon } from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const emit = defineEmits<{ selectCountry: [code: string] }>()
const mapRef = ref()
let am5Root: Root

onMounted(() => {
  am5Root = Root.new(mapRef.value)
  if (am5Root) {
    // map animation
    am5Root.setThemes([am5themes_Animated.new(am5Root)])
    // Create map chart
    const chart = am5Root.container.children.push(
      MapChart.new(am5Root, {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
      })
    )
    // Add zoom control
    chart.set('zoomControl', ZoomControl.new(am5Root, {}))
    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      MapPolygonSeries.new(am5Root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ']
      })
    )
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      toggleKey: 'active',
      interactive: true,
      fill: color('#6d28d9')
    })
    polygonSeries.mapPolygons.template.states.create('hover', { fill: color('#a78bfa') })
    polygonSeries.mapPolygons.template.states.create('active', { fill: color('#4c1d95') })

    let previousPolygon: MapPolygon | undefined

    polygonSeries.mapPolygons.template.on('active', function (_, target) {
      if (previousPolygon && previousPolygon != target) previousPolygon.set('active', false)
      if (target?.get('active')) {
        const { dataItem } = target
        // @ts-ignore: issue of the amChart library
        polygonSeries.zoomToDataItem(dataItem)
        if (
          dataItem?.dataContext &&
          typeof dataItem.dataContext === 'object' &&
          'id' in dataItem.dataContext
        )
          emit('selectCountry', String(dataItem.dataContext.id))
      } else chart.goHome()
      previousPolygon = target
    })
  }
})

onUnmounted(() => {
  if (am5Root) {
    am5Root.dispose()
  }
})
</script>

<template>
  <div
    ref="mapRef"
    class="w-full h-[45rem] border-solid border-2 border-slate-300 dark:border-slate-50 rounded"
  />
</template>
