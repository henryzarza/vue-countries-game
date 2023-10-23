<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Country } from '@/types/Home'
import * as am5 from '@amcharts/amcharts5'
import * as am5Map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
// import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'

const { countries } = defineProps<{ countries: Country[] }>()
const mapRef = ref();
let am5Root: am5.Root;

onMounted(() => {
  am5Root = am5.Root.new(mapRef.value);
  if (am5Root) {
    // map theme and animation
    am5Root.setThemes([
      am5themes_Animated.new(am5Root),
      // am5themes_Dark.new(am5Root)
    ]);

    // Create the map chart
    const chart = am5Root.container.children.push(am5Map.MapChart.new(am5Root, {
      projection: am5Map.geoMercator(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20
    }));

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(am5Map.MapPolygonSeries.new(am5Root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"]
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "🇨🇿 {name}",
      toggleKey: "active",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5Root.interfaceColors.get("primaryButtonHover")
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5Root.interfaceColors.get("primaryButtonHover")
    });

    let previousPolygon: am5Map.MapPolygon | undefined;

    polygonSeries.mapPolygons.template.on("active", function (_, target) {
      if (previousPolygon && previousPolygon != target) {
        previousPolygon.set("active", false);
      }
      if (target && target.get("active")) {
        polygonSeries.zoomToDataItem(target.dataItem as any);
      }
      else {
        chart.goHome();
      }
      previousPolygon = target;
    });

    // Add zoom control
    chart.set("zoomControl", am5Map.ZoomControl.new(am5Root, {}));
  }
})

onUnmounted(() => {
  if (am5Root) {
    am5Root.dispose()
  }
})

// const root = am5.Root.new("chartdiv")

const filterCountries = computed(() => countries.slice(0, 6))
</script>

<template>
  <div
    ref="mapRef"
    class="w-full h-[50rem] border-solid border-2 border-violet-500 dark:border-teal-500 rounded"
  />
</template>
