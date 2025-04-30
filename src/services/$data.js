import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { URL } from "../config/urls";
import WmsLayer from "../models/WmsLayer";
import { toLonLat } from "ol/proj";

class $data {

  getStats() {
    return axios.get(URL.STATS)
      .then(result => result.data.sort((a,b) => b.access_count - a.access_count))
      .catch(err => {throw err})
  }

  getLayers(active, opacity) {
    return axios.get(URL.LAYERS)
      .then(result => {
        return result.data.map(obj => {
          return [
            new WmsLayer({ ...obj, code: obj.class, defaultActive: active, defaultOpacity: opacity }),
            new WmsLayer({ ...obj, code: obj.class, defaultActive: active, defaultOpacity: opacity, isCompare: true })
          ];
        });


      })
      .catch(err => { throw err });
  }

  getMastodonPosts() {
    return axios.get('https://fosstodon.org/api/v1/accounts/323362/statuses?exclude_replies=true')
      .then(result => {
        return result.data.map(obj => {
          const isBoosted = Boolean(obj.reblog);
          return {
            isBoosted: isBoosted,
            channel: 'https://fosstodon.org/@opengeohub',
            username: isBoosted ? `@${obj.reblog.account?.username}` : `@${obj.account?.username}`,
            displayName: isBoosted ? obj.reblog.account?.display_name : obj.account?.display_name,
            avatar: isBoosted ? obj.reblog.account.avatar_static : obj.account.avatar_static,
            date: moment(obj.created_at).format('MMM D'),
            content: obj.reblog?.content || obj.content,
            postUrl: obj.reblog?.url || obj.url,
            media: obj.media_attachments.length > 0 ? obj.media_attachments[0]?.preview_url : null
          }
        })
      })
      .catch(err => { throw err });
  }

  formatSupportDate(time, name) {
    let now = moment();

    let date = moment(time);
    let years = now.diff(date, 'years');
    let months = now.diff(date, 'months');
    let weeks = now.diff(date, 'weeks');
    let days = now.diff(date, 'days');
    let hours = now.diff(date, 'hours');
    let minutes = now.diff(date, 'minutes');

    if (years >= 1) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago by ${name}`;
    }

    if (months >= 1 && months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago by ${name}`;
    }

    if (weeks >= 1 && weeks < 5) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago by ${name}`;
    }

    if (days >= 1 && days < 31) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago by ${name}`;
    }

    if (hours >= 1 && hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago by ${name}`;
    }

    if (minutes >= 1 && minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago by ${name}`;
    }

    return `Just now`;
  }

  getGithubIsses() {
    return axios.get('https://api.github.com/repos/AI4SoilHealth/EcoDataCube/issues')
      .then(result => result.data
        // .filter(obj => obj.state === 'opened')
        .map(obj => {
          return {
            title: obj.title,
            description: _.unescape(obj.body),
            timeAndUser: this.formatSupportDate(obj.updated_at, obj.user.login),
            link: obj.html_url
          }
        })

      )
      .catch(err => { throw err })
  }

  getZoteroPublications() {
    return axios.get('https://api.zotero.org/groups/5969879/items/top?direction=desc&format=json&sort=title')
      .then(result => {
        console.log(result.data);

        return result.data.map(obj => ({
          title: obj.data.title,
          doi: obj.data.DOI,
          date: moment(obj.data.dateModified).format('MMM DD, YYYY'),
          creators: obj.data.creators.map(obj => `${obj.firstName} ${obj.lastName}`).join(', '),
          zoteroLink: obj.links.alternate.href
        }))
      })
      .catch(err => {throw err})
  }

  getZenodoPublications() {
    return axios.get('https://zenodo.org/api/communities/d51d85c3-64b3-44aa-8b30-d0cc34cc015a/records?q=&sort=newest&page=1&size=10')
      .then(result => {
        console.log(result.data)
        return result.data.hits.hits.map(obj => ({
          title: obj.title,
          doi: obj.doi,
          date: moment(obj.metadata.publication_date).format('MMM DD, YYYY'),
          creators: obj.metadata.creators.map(obj => obj.name).join(', '),
          zenodoLink: obj.links.latest_html
        }))
      })
      .catch(err => {throw err})
  }

  getLegend(url) {
    return axios.get(url)
      .then(result => {
        return result.data.Legend[0].rules[0].symbolizers[0].Raster.colormap.entries
          .map(obj => ({
            ...obj,
            quantity: parseFloat(obj.quantity)
          }));
      })
      .catch(err => { throw err })
  }

  pointQuery(url, coordinates, layerObj) {
    let coords = [];

    if (coordinates) {
      coords = toLonLat(coordinates);
    }

    return axios.get(url.replace('__LAT__', coords[1]).replace('__LON__', coords[0]))
      .then((result) => {
        return result.data.reverse();
      })
      .catch(err => { throw err })
  }

  pointQueryStream(url, coordinates) {
    let coords = [];

    if (coordinates) {
      coords = toLonLat(coordinates);
    }

    let formated = url.replace('__LAT__', coords[1]).replace('__LON__', coords[0]);

    return fetch(formated)
      .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let partialData = '';
        return new ReadableStream({
          start(controller) {
            function read() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }

                partialData += decoder.decode(value, { stream: true });
                console.log(partialData)
                const items = partialData.split(';');
                partialData = items.pop();

                for (const item of items) {
                  try {
                    if (item !== '') {
                      if (parseFloat(item.split(',')[1]) === -9999) {
                        throw new Error('There is no meteorological data for the selected location');
                      }
                      controller.enqueue({ x: item.split(',')[0], y: parseFloat(item.split(',')[1]) / 10 });
                    }
                  } catch (e) {

                    controller.error({
                      message: {
                        error: 'Failed to parse data'
                      }
                    });
                  }
                }
                return read();
              });
            }
            read();
          },
          cancel() {
            pqController.abort();
          }
        });
      })
      .catch(err => {
        throw err.message;
      });
  }

  formatOptions = (layerObj) => {
    return {
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
        axis: 'x',
      },
      animation: {
        duration: 150
      },
      scales: {

        x: {
          offset: true,
          ticks: {
            maxRotation: 20,
            color: '#fff',
            autoSkipPadding: 15
          }
        },
        y: {
          offset: true,
          beginAtZero: false,
          ticks: {
            maxRotation: 0, 
            color: '#fff',
          }
        }
      },
      plugins: {

        legend: {
          display: true,
          labels: {
            boxWidth: layerObj.depths.length > 0 ? 10 : 0,
            boxHeight: layerObj.depths.length > 0 ? 10 : 0,
            color: "#fff",
            padding: 20,
            usePointStyle: layerObj.depths.length > 0,
          }
        },
        tooltip: {
          callbacks: {
            title: (items) => {
              return items[0].raw.x
            }
          }
        },
      }
    }
  }

  formatData = (data, legend, layerObj, isBar) => {
    if (layerObj.depths.length > 0) {
      let b0cm = {
        label: '0 - 20cm',
        usePointStyle: true,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        data: []
      };
      let b20cm = {
        label: '20 - 50cm',
        usePointStyle: true,
        borderColor: 'red',
        backgroundColor: 'red',
        data: []
      };
      let b50cm = {
        label: '50 - 100cm',
        usePointStyle: true,
        borderColor: '#00ff00',
        backgroundColor: '#00ff00',
        data: []
      };
      let b100cm = {
        label: '100 - 200cm',
        usePointStyle: true,
        borderColor: '#0000ff',
        backgroundColor: '#0000ff',
        data: []
      };

      console.log(data)

      data.map(obj => {
        if (obj.layer.indexOf('b0cm..20cm') > -1) {
          b0cm.data.push(obj.value)
        }

        if (obj.layer.indexOf('b20cm..50cm') > -1) {
          b20cm.data.push(obj.value)
        }

        if (obj.layer.indexOf('b50cm..100cm') > -1) {
          b50cm.data.push(obj.value)
        }

        if (obj.layer.indexOf('b100cm..200cm') > -1) {
          b100cm.data.push(obj.value)
        }
      })

      return {
        labels: layerObj.rangeLabels,
        datasets: [b0cm, b20cm, b50cm, b100cm]
      }

    }


    if (layerObj.isVars) {
      let formated = [];

      layerObj.range.map((r, i) => {
        data.map((obj) => {
          if (obj.layer.indexOf(r) > -1) {
            formated.push(obj.value);
          }
        })
      });

      return {
        labels: layerObj.rangeLabels,
        datasets: [{
          label: layerObj.title,
          data: formated,
          backgroundColor: '#EB4850',
          borderColor: '#fff',
          // borderSkipped: true,
          barPercentage: 1.0,
          borderWidth: 0,
          categoryPercentage: 1.0,
          borderWidth: 1,
          fill: true,
          tension: 0.1
        }]
      }
    }

    let labels = []
    let formated = [];

    layerObj.range.map((r, i) => {
      data.map((obj) => {
        if (obj.layer.indexOf(r) > -1) {
          formated.push({x: layerObj.rangeLabels[i], y: obj.value});
        }
      })
    });

    return {
      labels: data.length === 1 ? [data[0]?.date_label] : layerObj.rangeLabels,
      datasets: [{
        label: layerObj.title,
        data: data.length === 1 ? [data[0]?.value] : formated,
        backgroundColor: '#EB4850',
        borderColor: isBar ? 'transparent' : '#fff',
        // borderSkipped: true,
        barPercentage: 1.0,
        borderWidth: 0,
        categoryPercentage: 1.0,
        borderWidth: 1,
        fill: true,
        tension: 0.1,
        spanGaps: true
      }]
    }
  }

  formatColors = (data, legend) => {
    try {
      return data.map(obj => {


        return this.formatValueForLegend(obj.value, legend);

      })

    } catch (e) {
      console.log(e);
      return '#fff'
    }
  }

  formatValueForLegend(val, legend) {


    try {
      if (val < legend[0].quantity) {
        return legend[0].color;
      }

      if (val >= legend[legend.length - 1].quantity) {
        return legend[legend.length - 1].color;
      }

      for (let i = 0; i < legend.length - 1; i++) {
        if (val >= legend[i].quantity && val < legend[i + 1].quantity) {
          return legend[i].color;
        }
      }

      return '#000'
    } catch (e) {
      // console.log(e)
    }

  }
}

export default new $data();