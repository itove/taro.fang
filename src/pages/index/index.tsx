import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Grid, NoticeBar, Swiper, Tabs, SearchBar } from '@nutui/nutui-react-taro'
import House from '../../images/house.jpg'
import H1 from '../../images/h1.jpg'

function gotoNode(id, type = 3) {
  Taro.navigateTo({url: '/pages/node/show?type=' + type + '&id=' + id})
}

function gotoNodeIndex(region, type) {
  Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})
}

function gotoUrl(url) {
  Taro.navigateTo({url: '/pages/' + url})
}

function gridGoto(node) {
  if (node.isTab) {
    Taro.switchTab({url: '/pages/' + node.url})
    .then(
      res => {
        Taro.pageScrollTo({
          selector: node.target,
          duration: 300
        })
      }
    )
  } else {
    Taro.navigateTo({url: '/pages/' + node.url})
  }
}

function More({region, type}) {
  return (
    <View
      className="more" 
      onClick={() => Taro.navigateTo({url: '/pages/node/index?region=' + region + '&type=' + type})}
    >
    更多 <img width="16px" height="16px" src={Env.iconUrl + 'arrow-right.png'} />
    </View>
  )
}

function TabPane({node, type, index}) {
  return (
    <View key={index} className="list-item" onClick={() => gotoNode(node.id, type)}>
    <View className="img">
    <Image className="w-100 rounded" src={Env.imageUrl + node.image} mode="widthFix" />
    </View>
    <View className="text">
    {node.title}
    <p className="ellipsis-2">{node.summary}</p>
    </View>
    </View>
  )
}

function SwiperItem({node, index}) {
  return (
    <Swiper.Item key={index} className="">
    <Image
    className="w-100"
    mode="widthFix"
    onClick={() => console.log(index)}
    src={H1}
    alt=""
    />
    </Swiper.Item>
  )
}

function GridItem({node, index}) {
  return (
    <Grid.Item text={node.t} key={index} onClick={() => gridGoto(node) }>
    <Image className="img" src={node.p} mode="widthFix" />
    </Grid.Item>
  )
}

function Index() {
  const [sliderList, setSliderList] = useState([])
  const [tongzhi, setTongzhi] = useState([])
  const [gridList, setGridList] = useState([])
  const [youList, setYouList] = useState([])
  const [zhuList, setZhuList] = useState([])
  const [chiList, setChiList] = useState([])
  const [gouList, setGouList] = useState([])
  const [dili, setDili] = useState({})
  const [jianjie, setJianjie] = useState({})
  const [hongsetext, setHongsetext] = useState({})
  const [historytext, setHistorytext] = useState({})
  const [tab1value, setTab1value] = useState<string | number>('0')

  const onShareAppMessage = (res) => {}
  const onShareTimeline = (res) => {}

  const gridItems = [
    { t: '新房', p: Env.iconUrl + 'grid_2.png', target: '.youzai', url: 'leyou/index', isTab: true, },
    { t: '二手房', p: Env.iconUrl + 'grid_2.png', target: '.zhuzai', url: 'leyou/index', isTab: true, },
    { t: '租房', p: Env.iconUrl + 'grid_4.png', target: '.chizai', url: 'leyou/index', isTab: true, },
    { t: '保障房', p: Env.iconUrl + 'grid_4.png', target: '.gouzai', url: 'leyou/index', isTab: true, },
    { t: '需求调查', p: Env.iconUrl + 'grid_5.png', target: '', url: 'node/show?id=39&type=4', isTab: false, },
    { t: '惠民政策', p: Env.iconUrl + 'grid_6.png', target: '', url: 'node/index?type=5&region=dangjian', isTab: false, },
    { t: '房产资讯', p: Env.iconUrl + 'grid_7.png', target: '', url: 'node/index?type=5&region=wenlv', isTab: false, },
    { t: '意见反馈', p: Env.iconUrl + 'grid_8.png', target: '', url: 'node/index?type=5&region=youji', isTab: false, },
  ]

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'wx/home'
    })
    .then(res => {
      const data = res.data
      console.log(res)

      setSliderList(data.slider.map((node, index) => <SwiperItem node={node} index={index} />))
      // setTongzhi(data.tongzhi.map((node, index) => <div onClick={() => gotoNode(node.id, 5)}>{node.title}</div> ))
      setTongzhi(['测试通知公告1', '测试通知公告2'])
      setYouList(data.youzai.map((node, index) => <TabPane node={node} type={0} index={index} />))
      setZhuList(data.zhuzai.map((node, index) => <TabPane node={node} type={1} index={index} />))
      setChiList(data.chizai.map((node, index) => <TabPane node={node} type={2} index={index} />))
      setGouList(data.gouzai.map((node, index) => <TabPane node={node} type={3} index={index} />))
      setGridList(gridItems.map((node, index) => <GridItem node={node} index={index} />))
      // setDili(data.dili[0])
      setJianjie(data.jianjie[0])
      setHongsetext(data.hongsetext[0])
      setHistorytext(data.historytext[0])
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <View className="home">
      <View className="hell">
      </View>
      <Swiper defaultValue={0} autoPlay className="" height="230">
        {sliderList}
      </Swiper>

      <SearchBar className="mt-1 searchbar" shape="round" placeholder="新房、二手房、租房、保障房、资讯" />

      <Grid columns="4" className="grid">
        {gridList}
      </Grid>

      <NoticeBar
      leftIcon={<img alt="notice" width="16px" height="16px" src={Env.iconUrl + 'speaker.png'} />}
      rightIcon={<More region={'tongzhi'} type={5} />}
      className="rounded-5 overflow-hidden"
      direction="vertical"
      list={tongzhi}
      speed={5}
      duration={1000}
      height={30}
      // closeable
      />

      <View className="zoujin block">
        <View className="wrapper">
          <View className="" onClick={() => gotoNode(jianjie.id, 4)}>
            <Image className="w-100 rounded" src={House} mode="aspectFill" />
            <View class="text">
              保障房申请
            </View>
          </View>
          <View className="col2">
            <View className="" onClick={() => gotoNodeIndex('hongse', 5)}>
              <Image className="w-100 rounded" src={House} mode="aspectFill" />
              <View class="text">
                我要买房
              </View>
            </View>
            <View className="" onClick={() => gotoNodeIndex('history', 5)}>
              <Image className="w-100 rounded" src={House} mode="aspectFill" />
              <View class="text">
                我要卖房
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="leyou block">
        <Tabs
          value={tab1value}
          autoHeight={true}
          onChange={(value) => {
            setTab1value(value)
          }}
          className="tabs"
          >
          <Tabs.TabPane className="tabpane" title="推荐"> {youList} </Tabs.TabPane>
          <Tabs.TabPane className="tabpane" title="新房"> {zhuList} </Tabs.TabPane>
          <Tabs.TabPane className="tabpane" title="二手房"> {chiList} </Tabs.TabPane>
          <Tabs.TabPane className="tabpane" title="租房"> {gouList} </Tabs.TabPane>
          <Tabs.TabPane className="tabpane" title="保障房"> {gouList} </Tabs.TabPane>
        </Tabs>
      </View>

    </View>
  )
}

export default Index
