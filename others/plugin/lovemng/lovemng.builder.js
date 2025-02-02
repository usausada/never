/********************************************************************************
 * 好感度管理ティラノビルダープラグイン設定 ver1.0.0
 *
 * @since 2023/12/30
 * @author Kei Yusu
 *
 *********************************************************************************/
'use strict';
module.exports = class plugin_setting {
    
    constructor(TB) {
        
        /* TBはティラノビルダーの機能にアクセスするためのインターフェスを提供する */
        this.TB = TB;
        
        /* プラグイン名を格納する */
        this.name= TB.$.s("好感度管理プラグイン");
        
        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("キャラクター毎の好感度を管理し、好感度による分岐を簡単に行えるようにします。");
        
        /*プラグイン説明用の画像ファイルを指定する。プラグインフォルダに配置してください*/
        this.plugin_img = "lovemng.png";
        
    }
    
    
    /* プラグインをインストールを実行した時１度だけ走ります。フォルダのコピーなどにご活用ください。*/
    triggerInstall(){
        
        /*
        //プラグインからプロジェクトにファイルをコピーするサンプルです 
        var project_path = TB.getProjectPath() ; 
        var from_path = project_path + "data/others/plugin/plugin_template/copy_folder";
        var to_path = project_path + "data/image/copy_folder";
        TB.io.copy(from_path,to_path);
        */
        
    }
        
    /*
        追加するコンポーネントを定義します。
    */

    defineComponents(){
        
        var cmp = {};
        var TB = this.TB;
                        
        /********************************************************************************
         * 好感度設定タグ作成
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @param name キャラクタ名
         * @param love 好感度
         * @param memo メモ
         * @since 2023/12/30
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["lovemng_set"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("好感度設定"), /* コンポーネント名称 */
                "help":TB.$.s("キャラクター毎の好感度を設定します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("好感度設定"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){

                    return e.data.pm.memo || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID                    
                    "id" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "ID", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    }, 

                    // キャラクター名
                    "name" : {
                        type : "Text",
                        name : TB.$.s("キャラクター名"),
                        help : TB.$.s("キャラクターの名前を設定してください。空白でも問題ありません。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "name", val);
                        }
    
                    },

                    // 好感度
                    "love" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "好感度", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("好感度を設定してください。"),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -9999, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 

                    // メモ
                    "memo" : {
                        type : "Text",
                        name : TB.$.s("メモ"),
                        help : TB.$.s("メモ欄です。ご自由にお使いください。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "memo", val);
                        }
    
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };
        
        /********************************************************************************
         * 好感度取得タグ
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @param props プロパティ名
         * @since 2023/12/30
         * @author Kei Yusu
         * @see コンポーネントとしては使用しないのでコメントアウト
         * @see ティラノスクリプトのタグで使用する
         * @see [lovemng_get id=1 scope="f" props="name"]
         * @see 上記タグを実行すると、tf.lovemng_get に値が格納されるので、直後にこれを参照する
         * 
         *********************************************************************************/ 
        // cmp["lovemng_get"] = {
            
        //     "info":{
                
        //         "default":false, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
        //         "name":TB.$.s("好感度取得"), /* コンポーネント名称 */
        //         "help":TB.$.s("設定されたキャラクター毎の好感度を取得します。"), /* コンポーネントの説明を記述します */ 
        //         "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
        //     },
            
        //     /* コンポーネントの情報の詳細を定義します */
            
        //     "component":{
                
        //         name : TB.$.s("好感度取得"), /* コンポーネント名称 */
        //         component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
        //         /*ビューに渡す値*/
        //         default_view : {
        //             base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
        //             icon : "s-icon-star-full", /*変更しない*/
        //             icon_color : "#FFFF99", /*変更しない*/
        //             category : "plugin" /*変更しない*/
        //         },
                
        //         /*変更しない*/
        //         param_view : {
        //         },
            
        //         /* コンポーネントのパラメータを定義していきます */
        //         param:{
                    
        //             // 変数格納スコープ
        //             "scope" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("システム変数(sf)"),
        //                         val : "sf"
        //                     },
        //                     {
        //                         name : TB.$.s("ゲーム変数(f)"),
        //                         val : "f"
        //                     },
        //                     {
        //                         name : TB.$.s("一時変数(tf)"),
        //                         val : "tf"
        //                     }
        //                 ],
        //                 default_val : "f",
        //                 name : TB.$.s("変数格納スコープ"),
        //                 help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
        //             },

        //             // ID                    
        //             "id" : {
        //                 type : "Num", /*Numは数字入力を設定できます*/
        //                 name : "ID", /*パラメータ名*/
        //                 unit : "", /*単位を表示できます*/
        //                 help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
        //                 default_val : 0, /*初期値*/
                        
        //                 /*spinnerは数値をスピナー形式で表現します*/
        //                 spinner : {
        //                     min : 0, /*入力の最小値*/
        //                     max : 9999, /*入力の最大値*/
        //                     step : 1 /*スピナーを１回動かした時のステップ値*/
        //                 },
                        
        //                 validate : {
        //                     number : true /*数値か否かのチェックを有効化*/
        //                 }
        
        //             }, 

        //             // プロパティ
        //             "props" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("キャラクター名"),
        //                         val : "name"
        //                     },
        //                     {
        //                         name : TB.$.s("好感度"),
        //                         val : "love"
        //                     },
        //                     {
        //                         name : TB.$.s("メモ"),
        //                         val : "memo"
        //                     },
        //                 ],
        //                 default_val : "love",
        //                 name : TB.$.s("項目"),
        //                 help : TB.$.s("取得する項目を選択してください。"),
                        
        //             },
                    
        //         },
                
        //         /*
        //             途中からプレビューの時に実行するタグを返す。
        //             例えば背景変更の機能をもったコンポーネントの場合、
        //             途中からプレビューのときに背景変更のタグを実行しておかないと
        //             途中からプレビューにこのコンポーネントが反映されません。
        //             timeなどの時間は短くしておく必要があります。
        //         */
        //         /*
        //         preview_tag:function(preview,cmp){
                    
        //             var storage = cmp.data.pm["storage"]; 
                    
        //             //返却用のタグを設定
        //             preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
        //         },
        //         */
            
        //     }
            
        // };
        
        /********************************************************************************
         * 好感度加算タグ作成
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @param love 好感度
         * @param memo メモ
         * @since 2023/12/30
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["lovemng_add"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("好感度加算"), /* コンポーネント名称 */
                "help":TB.$.s("設定されたキャラクター毎の好感度を加算（減算）します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("好感度加算"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){

                    return e.data.pm.memo || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID                    
                    "id" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "ID", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 

                    // 好感度
                    "love" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "好感度", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("現在の好感度に加算または減算する値を設定してください。減算の場合はマイナス値を設定してください。"),
                        
                        default_val : 1, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -9999, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 
                  
                    // メモ
                    "memo" : {
                        type : "Text",
                        name : TB.$.s("メモ"),
                        help : TB.$.s("メモ欄です。ご自由にお使いください。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "memo", val);
                        }
    
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 好感度削除タグ作成
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @since 2023/12/30
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["lovemng_del"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("好感度削除"), /* コンポーネント名称 */
                "help":TB.$.s("好感度管理からキャラクターを削除します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("好感度削除"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },
                    
                    // ID                    
                    "id" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "ID", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 好感度表示タグ
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @param props プロパティ名
         * @since 2023/12/30
         * @author Kei Yusu
         * @see コンポーネントとしては使用しないのでコメントアウト
         * @see テキストコンポーネント内でタグを使用する
         * @see [lovemng_show id=1 scope="f" props="name"]
         * @see 上記でID=1のキャラクター名を表示
         * 
         *********************************************************************************/
        // cmp["lovemng_show"] = {
            
        //     "info":{
                
        //         "default":false, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
        //         "name":TB.$.s("好感度表示（確認用）"), /* コンポーネント名称 */
        //         "help":TB.$.s("設定されたキャラクター毎の好感度を表示します。"), /* コンポーネントの説明を記述します */ 
        //         "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
        //     },
            
        //     /* コンポーネントの情報の詳細を定義します */
            
        //     "component":{
                
        //         name : TB.$.s("好感度表示"), /* コンポーネント名称 */
        //         component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
        //         /*ビューに渡す値*/
        //         default_view : {
        //             base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
        //             icon : "s-icon-star-full", /*変更しない*/
        //             icon_color : "#FFFF99", /*変更しない*/
        //             category : "plugin" /*変更しない*/
        //         },
                
        //         /*変更しない*/
        //         param_view : {
        //         },
            
        //         /* コンポーネントのパラメータを定義していきます */
        //         param:{
                    
        //             // 変数格納スコープ
        //             "scope" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("システム変数(sf)"),
        //                         val : "sf"
        //                     },
        //                     {
        //                         name : TB.$.s("ゲーム変数(f)"),
        //                         val : "f"
        //                     },
        //                     {
        //                         name : TB.$.s("一時変数(tf)"),
        //                         val : "tf"
        //                     }
        //                 ],
        //                 default_val : "f",
        //                 name : TB.$.s("変数格納スコープ"),
        //                 help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
        //             },

        //             // ID                    
        //             "id" : {
        //                 type : "Num", /*Numは数字入力を設定できます*/
        //                 name : "ID", /*パラメータ名*/
        //                 unit : "", /*単位を表示できます*/
        //                 help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
        //                 default_val : 0, /*初期値*/
                        
        //                 /*spinnerは数値をスピナー形式で表現します*/
        //                 spinner : {
        //                     min : 0, /*入力の最小値*/
        //                     max : 9999, /*入力の最大値*/
        //                     step : 1 /*スピナーを１回動かした時のステップ値*/
        //                 },
                        
        //                 validate : {
        //                     number : true /*数値か否かのチェックを有効化*/
        //                 }
        
        //             }, 

        //             // プロパティ
        //             "props" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("キャラクター名"),
        //                         val : "name"
        //                     },
        //                     {
        //                         name : TB.$.s("好感度"),
        //                         val : "love"
        //                     },
        //                     {
        //                         name : TB.$.s("メモ"),
        //                         val : "memo"
        //                     },
        //                 ],
        //                 default_val : "love",
        //                 name : TB.$.s("項目"),
        //                 help : TB.$.s("取得する項目を選択してください。"),
                        
        //             },
                    
        //         },
                
        //         /*
        //             途中からプレビューの時に実行するタグを返す。
        //             例えば背景変更の機能をもったコンポーネントの場合、
        //             途中からプレビューのときに背景変更のタグを実行しておかないと
        //             途中からプレビューにこのコンポーネントが反映されません。
        //             timeなどの時間は短くしておく必要があります。
        //         */
        //         /*
        //         preview_tag:function(preview,cmp){
                    
        //             var storage = cmp.data.pm["storage"]; 
                    
        //             //返却用のタグを設定
        //             preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
        //         },
        //         */
            
        //     }
            
        // };

        /********************************************************************************
         * 好感度順位タグ
         *
         * @param scope 変数格納スコープ
         * @param props プロパティ名
         * @param rank 順位
         * @since 2023/12/30
         * @author Kei Yusu
         * @see コンポーネントとしては使用しないのでコメントアウト
         * @see テキストコンポーネント内でタグを使用する
         * @see [lovemng_rank scope="f" props="name" rank=1]
         * @see 上記で好感度が1位のキャラクター名を表示
         * 
         *********************************************************************************/
        // cmp["lovemng_rank"] = {
            
        //     "info":{
                
        //         "default":false, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
        //         "name":TB.$.s("好感度順位（確認用）"), /* コンポーネント名称 */
        //         "help":TB.$.s("設定されたキャラクター毎の好感度の順位を指定して表示します。"), /* コンポーネントの説明を記述します */ 
        //         "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
        //     },
            
        //     /* コンポーネントの情報の詳細を定義します */
            
        //     "component":{
                
        //         name : TB.$.s("好感度順位"), /* コンポーネント名称 */
        //         component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
        //         /*ビューに渡す値*/
        //         default_view : {
        //             base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
        //             icon : "s-icon-star-full", /*変更しない*/
        //             icon_color : "#FFFF99", /*変更しない*/
        //             category : "plugin" /*変更しない*/
        //         },
                
        //         /*変更しない*/
        //         param_view : {
        //         },
            
        //         /* コンポーネントのパラメータを定義していきます */
        //         param:{
                    
        //             // 変数格納スコープ
        //             "scope" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("システム変数(sf)"),
        //                         val : "sf"
        //                     },
        //                     {
        //                         name : TB.$.s("ゲーム変数(f)"),
        //                         val : "f"
        //                     },
        //                     {
        //                         name : TB.$.s("一時変数(tf)"),
        //                         val : "tf"
        //                     }
        //                 ],
        //                 default_val : "f",
        //                 name : TB.$.s("変数格納スコープ"),
        //                 help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
        //             },

        //             // プロパティ
        //             "props" : {
        //                 type : "Select",
                        
        //                 select_list : [
        //                     {
        //                         name : TB.$.s("キャラクター名"),
        //                         val : "name"
        //                     },
        //                     {
        //                         name : TB.$.s("好感度"),
        //                         val : "love"
        //                     },
        //                     {
        //                         name : TB.$.s("メモ"),
        //                         val : "memo"
        //                     },
        //                 ],
        //                 default_val : "love",
        //                 name : TB.$.s("項目"),
        //                 help : TB.$.s("取得する項目を選択してください。"),
                        
        //             },
                    
        //             // 順位
        //             "rank" : {
        //                 type : "Num", /*Numは数字入力を設定できます*/
        //                 name : "順位", /*パラメータ名*/
        //                 unit : "位", /*単位を表示できます*/
        //                 help : TB.$.s("好感度の順位を設定してください。好感度１位のキャラクターを取得する場合は1を設定してください。"),
                        
        //                 default_val : 1, /*初期値*/
                        
        //                 /*spinnerは数値をスピナー形式で表現します*/
        //                 spinner : {
        //                     min : 1, /*入力の最小値*/
        //                     max : 999, /*入力の最大値*/
        //                     step : 1 /*スピナーを１回動かした時のステップ値*/
        //                 },
                        
        //                 validate : {
        //                     number : true /*数値か否かのチェックを有効化*/
        //                 }
        
        //             }, 

        //         },
                
        //         /*
        //             途中からプレビューの時に実行するタグを返す。
        //             例えば背景変更の機能をもったコンポーネントの場合、
        //             途中からプレビューのときに背景変更のタグを実行しておかないと
        //             途中からプレビューにこのコンポーネントが反映されません。
        //             timeなどの時間は短くしておく必要があります。
        //         */
        //         /*
        //         preview_tag:function(preview,cmp){
                    
        //             var storage = cmp.data.pm["storage"]; 
                    
        //             //返却用のタグを設定
        //             preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
        //         },
        //         */
            
        //     }
            
        // };

        /********************************************************************************
         * 好感度ジャンプタグ
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @param rank 順位
         * @param storage ストレージ
         * @param target ターゲット
         * @since 2023/12/30
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["lovemng_jump"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("好感度ジャンプ"), /* コンポーネント名称 */
                "help":TB.$.s("設定されたキャラクター毎の好感度の順位を指定してジャンプ（分岐）します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("好感度ジャンプ"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){

                    const memo = e.data.pm.memo || "";
                    const storage = e.data.pm.storage || "";
                    const target = e.data.pm.target || "";

                    return `${memo} ${storage} ${target}`;

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID                    
                    "id" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "ID", /*パラメータ名*/
                        unit : "", /*単位を表示できます*/
                        help : TB.$.s("キャラクターを一意に識別できるIDを設定してください。"),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 

                    // 順位
                    "rank" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "順位", /*パラメータ名*/
                        unit : "位", /*単位を表示できます*/
                        help : TB.$.s("好感度の順位を設定してください。好感度１位のキャラクターを取得する場合は1を設定してください。"),
                        
                        default_val : 1, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 1, /*入力の最小値*/
                            max : 999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }
        
                    }, 
                    
                    // ストレージ
                    storage : TB._pm_type["storage"],

                    // ターゲット
                    target : TB._pm_type["target"],

                    // メモ
                    "memo" : {
                        type : "Text",
                        name : TB.$.s("メモ"),
                        help : TB.$.s("メモ欄です。ご自由にお使いください。"),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "memo", val);
                        }
    
                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 好感度クリアタグ作成
         *
         * @param id ID
         * @param scope 変数格納スコープ
         * @since 2023/12/30
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["lovemng_clear"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s(" 好感度クリア"), /* コンポーネント名称 */
                "help":TB.$.s("好感度管理を全てクリアします。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("好感度クリア"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                    
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("好感度を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        // 戻り値の設定
        return cmp;

    }
    
    test(){}

}

