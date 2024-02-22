<template class="__body">
    <div class="__main">
        <div class="__space">
            <t-space direction="vertical" size="32px" :style="{width:'100%'}">
                <t-tabs :value="value" theme="normal" @change="choice">
                    <t-tab-panel v-for='tab in tabs' :value="tab.id">
                        <template #label>
                            <icon :name="tab.icon" style="margin-right: 4px"/>
                            {{ tab.title }}
                        </template>
                    </t-tab-panel>
                </t-tabs>
            </t-space>
        </div>
        <div class="__section">
            <div class="__card" v-for="item in list">
                <GuidanceCard :icon=item.icon :title=item.title :url=item.url
                              @click.native="jump(item.url)"></GuidanceCard>
                <div class="__books">
                    <t-space v-if="item.type !== -1">
                        <icon v-if="item.collectionStatus === 1" class="__books_icon" name="star-filled"
                              @click.native="collection(item)"
                              size="20px"
                              style="color: #f57e08"/>
                        <icon v-else class="__books_icon" name="star" @click.native="collection(item)" size="20px"
                              style="color: #f57e08"/>
                        <icon class="__books_icon" name="share" @click.native="share(item)" size="20px"/>
                    </t-space>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import GuidanceCard from "@/components/GuidanceCard";
import dataList from '../../../script/default'
import tabs from '../../../script/tabs'
import {Icon} from "tdesign-icons-vue";
import {get, post} from "@/common/http";
import {
    collectionAction,
    guidanceAllList,
    guidancePrivacyList,
    guidanceTypeList,
    report,
    submitLink
} from "@/common/api";

export default {
    name: "Guidance",
    components: {
        GuidanceCard,
        Icon
    },
    data() {
        return {
            list: [],
            value: 0,
            tabs: []
        }
    },
    methods: {
        jump(url) {
            window.open(url, '_blank')
        },
        choice(data) {
            this.$data.value = data
            if (data === -1) {
                get(guidancePrivacyList).then(res => {
                    if (res.data.code === 10000) {
                        this.$data.list = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            } else {
                get(guidanceAllList, {"type": data}).then(res => {
                    if (res.data.code === 10000) {
                        this.$data.list = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        collection(item) {
            let collectionStatus = (item.collectionStatus === null || item.collectionStatus === 0) ? 1 : 0;
            let params = {
                "urlId": item.id,
                "status": collectionStatus
            }
            post(collectionAction, params).then(res => {
                if (res.data.code === 10000) {
                    this.choice(this.$data.value);
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        share(item) {
            var that = this;
            that.$copyText(item.url).then(function (e) {
                that.$notify.success({
                    title: '提示',
                    content: '地址已复制到剪切板！',
                    duration: 2000,
                });
            }, function (e) {
                that.$notify.error({
                    title: '提示',
                    content: '复制失败！',
                    duration: 2000,
                });
            })
        },
        async getList() {
            let guidanceList = [];
            let tabs = [];
            await get(guidanceTypeList).then(res => {
                if (res.data.code === 10000) {
                    tabs = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            })
            tabs.unshift({
                title: '全部',
                id: 0,
                icon: 'app'
            });
            tabs.push({
                title: '私密',
                id: -1,
                icon: 'lock-on'
            });
            this.$data.tabs = tabs;
            await get(guidanceAllList).then(res => {
                if (res.data.code === 10000) {
                    guidanceList = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            })
            this.$data.list = guidanceList;
        }
    },
    mounted() {
        this.getList();
        let needReport = this.$route.params.needReport;
        if (needReport === true) {
            post(report, {"sceneValue": 1}).then(res => {
                if (res.data.code !== 10000) {
                    this.$message.error(res.data.msg);
                }
            })
        }
    },
}
</script>

<style scoped>

.__body {

}

.__main {
    width: 100%;
    height: 100%;
}

.__space {
    width: 100%;
}

.__section {
    overflow: auto;
    height: 92%;
}

.__card {
    float: left;
    margin: 2% 0 1% 6.8%;
}

.__books {
    /*background-color: aquamarine;*/
    margin-top: 5px;
    height: 25px;
    float: right;
}

.__books_icon {
    margin-right: 5px;
}
</style>
