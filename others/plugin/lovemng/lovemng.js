/********************************************************************************
 * 好感度管理ティラノスクリプトプラグイン ver1.0.0
 *
 * @since 2023/12/30
 * @author Kei Yusu
 *
 *********************************************************************************/
(function(){

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
  const lovemng_set = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
      name: "",
      love: 0,
      memo: "",
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 好感度取得
      const love = isNumeric(pm.love) ? parseInt(pm.love) : 0;

      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);
      
      // 好感度管理配列がない場合
      if(typeof varobj.lovemngs === "undefined"){
  
        // 好感度管理配列作成
        varobj.lovemngs = [];
          
      }
  
      // 好感度オブジェクト取得
      const lovemng = varobj.lovemngs.find(it => it.id == pm.id);

      // 好感度オブジェクトを取得できた場合
      if(lovemng){

        // 好感度オブジェクトを更新
        lovemng.scope = lovemng.scope == scope ? lovemng.scope : scope;
        lovemng.name = pm.name == "" || lovemng.name == pm.name ? lovemng.name : pm.name;
        lovemng.love = love == 0 || lovemng.love == love ? lovemng.love : love;
        lovemng.memo = pm.memo == "" || lovemng.memo == pm.memo ? lovemng.memo : pm.memo;

      // 好感度オブジェクトを取得できない場合
      }else{

        // 新規好感度オブジェクトを作成して好感度管理配列に追加
        varobj.lovemngs.push({
          id: pm.id,
          scope: scope,
          name: pm.name,
          love: love,
          memo: pm.memo,
        });

      }
            
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度設定タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_set = object(lovemng_set);
  TYRANO.kag.ftag.master_tag.lovemng_set.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度取得タグ
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @param props プロパティ名
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_get = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
      props: "love"
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);
      
      // 好感度表示テキストの初期値を設定
      let showText = "";

      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度オブジェクト取得
        const lovemng = varobj.lovemngs.find(it => it.id == pm.id);

        // 好感度オブジェクトを取得できた場合
        if(lovemng){

          // プロパティ値を好感度表示テキストに設定
          showText = lovemng[pm.props].toString();

        }

      }

      // テンポラリ変数へ戻り値をキャッシュ
      // ※TyranoScript側で取得値を判断する際に使用する
      TYRANO.kag.variable.tf.lovemng_get = showText;

      // 次のタグへ
      this.kag.ftag.nextOrder();
      
    },

  }

  // 好感度取得タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_get = object(lovemng_get);
  TYRANO.kag.ftag.master_tag.lovemng_get.kag = TYRANO.kag;

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
  const lovemng_add = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
      love: 1,
      memo: "",
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 好感度取得
      const love = isNumericSign(pm.love) ? parseInt(pm.love) : 0;

      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);

      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度オブジェクト取得
        const lovemng = varobj.lovemngs.find(it => it.id == pm.id);

        // 好感度オブジェクトを取得できた場合
        if(lovemng){

          // 好感度加算
          lovemng.love = parseInt(lovemng.love) + love;

          // メモ設定
          lovemng.memo = pm.memo == "" || lovemng.memo == pm.memo ? lovemng.memo : pm.memo;

        }

      }
            
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度加算タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_add = object(lovemng_add);
  TYRANO.kag.ftag.master_tag.lovemng_add.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度削除タグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_del = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);

      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度管理配列を指定IDを除いて再作成
        varobj.lovemngs = varobj.lovemngs.filter(it => it.id != pm.id);

      }
            
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度削除タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_del = object(lovemng_del);
  TYRANO.kag.ftag.master_tag.lovemng_del.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度表示タグ
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @param props プロパティ名
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_show = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
      props: "love"
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);
      
      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度オブジェクト取得
        const lovemng = varobj.lovemngs.find(it => it.id == pm.id);

        // 好感度表示テキストの初期値を設定
        let showText = "";

        // 好感度オブジェクトを取得できた場合
        if(lovemng){

          // プロパティ値を好感度表示テキストに設定
          showText = lovemng[pm.props].toString();

          // 好感度表示テキストを取得できた場合
          if(showText){

            // テキスト出力
            this.kag.ftag.startTag("text", {val: showText.toString(), backlog: "join"});

          }

        }

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度表示タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_show = object(lovemng_show);
  TYRANO.kag.ftag.master_tag.lovemng_show.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度順位タグ
   *
   * @param scope 変数格納スコープ
   * @param props プロパティ名
   * @param rank 順位
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_rank = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      scope: "f",
      props: "love",
      rank: 1,
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // ランク取得
      const rank = isNumeric(pm.rank) ? parseInt(pm.rank) : 1;

      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);
      
      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度オブジェクトをソート後に指定の順位を取得
        const lovemng = varobj.lovemngs.sort((a,b) => {

          // 1.好感度による順位付け(降順)
          if(a.love !== b.love) { return parseInt(b.love) - parseInt(a.love) }
          
          // 2.IDによる順位付け(昇順)
          return a.id - b.id;

        })[rank - 1];

        // 好感度表示テキストの初期値を設定
        let showText = "";

        // 好感度オブジェクトを取得できた場合
        if(lovemng){

          // プロパティ値を好感度表示テキストに設定
          showText = lovemng[pm.props].toString();

          // 好感度表示テキストを取得できた場合
          if(showText){

            // テキスト出力
            this.kag.ftag.startTag("text", {val: showText.toString(), backlog: "join"});

          }

        }

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度順位タグ追加
  TYRANO.kag.ftag.master_tag.lovemng_rank = object(lovemng_rank);
  TYRANO.kag.ftag.master_tag.lovemng_rank.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度ジャンプタグ
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @param rank 順位
   * @param storage ストレージ
   * @param target ターゲット
   * @param memo メモ
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_jump = {
    kag: TYRANO.kag,
    vital: ["id"],
    pm: {
      scope: "f",
      rank: 1,
      storage: "",
      target: "",
      memo: "",
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // ランク取得
      const rank = isNumeric(pm.rank) ? parseInt(pm.rank) : 1;

      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);
      
      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度オブジェクトをソート後に指定の順位を取得
        const lovemng = varobj.lovemngs.sort((a,b) => {

          // 1.好感度による順位付け(降順)
          if(a.love !== b.love) { return parseInt(b.love) - parseInt(a.love) }
          
          // 2.IDによる順位付け(昇順)
          return a.id - b.id;

        })[rank - 1];

        // 好感度オブジェクトを取得できた場合
        if(lovemng){

          // IDが指定IDの場合
          if(lovemng.id == pm.id){

            // メモ設定
            lovemng.memo = pm.memo == "" || lovemng.memo == pm.memo ? lovemng.memo : pm.memo;

            // ジャンプ
            this.kag.ftag.startTag("jump", {storage: pm.storage, target: pm.target});

            // 終了
            return;
            
          }

        }

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  // 好感度ジャンプタグ追加
  TYRANO.kag.ftag.master_tag.lovemng_jump = object(lovemng_jump);
  TYRANO.kag.ftag.master_tag.lovemng_jump.kag = TYRANO.kag;

  /********************************************************************************
   * 好感度クリアタグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const lovemng_clear = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      scope: "f",
    },
    start : function(pm) {
        
      // スコープ取得
      const scope = getScope(pm.scope);
  
      // 変数格納オブジェクト取得
      const varobj = getVarobj(scope);

      // 好感度管理配列がある場合
      if(typeof varobj.lovemngs !== "undefined"){

        // 好感度管理配列を削除
        delete varobj.lovemngs

      }
      
      // 取得メソッドの戻り値格納用のテンポラリ変数がある場合
      if(typeof TYRANO.kag.variable.tf.lovemng_get !== "undefined"){

        // テンポラリ変数を削除
        delete TYRANO.kag.variable.tf.lovemng_get

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();
  
    },

  }

  //  好感度クリアタグ追加
  TYRANO.kag.ftag.master_tag.lovemng_clear = object(lovemng_clear);
  TYRANO.kag.ftag.master_tag.lovemng_clear.kag = TYRANO.kag;
  
  /********************************************************************************
   * スコープ取得
   *
   * @param scope パラメータで指定されたスコープ
   * @returns スコープ("sf" or "f" or "tf")
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const getScope = (scope) => {

    // スコープバリデーション
    // ※スコープがシステム変数、ゲーム変数、一時変数以外の場合はゲーム変数とする
    if(scope !== "sf" && scope !== "f" && scope !== "tf") return "f"

    // 戻り値の設定
    // ※そのまま
    return scope;

  }

  /********************************************************************************
   * 変数格納オブジェクト取得
   *
   * @param scope スコープ
   * @returns 変数格納オブジェクト
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const getVarobj = (scope) => {

    // スコープがシステム変数か一時変数の場合
    if(scope == "sf" || scope == "tf"){

      // 戻り値の設定（variableから取得）
      return TYRANO.kag.variable[scope];

    // ゲーム変数の場合
    }else{

      // 戻り値の設定（statから取得）
      return TYRANO.kag.stat[scope];

    }

  }

  /********************************************************************************
   * 数値チェック
   *
   * @param target チェック対象
   * @returns true:数値 / false:数値以外
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isNumeric = (target) => {

    // 型チェック
    if(!target.toString().match(/^\d+$/)){

      // マッチしない場合は終了
      return false;

    }

    // 戻り値の設定
    return true;

  }

  /********************************************************************************
   * 数値と符号チェック
   *
   * @param target チェック対象
   * @returns true:数値と符号 / false:数値と符号以外
   * @since 2023/12/30
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isNumericSign = (target) => {

    // 型チェック
    if(!target.toString().match(/^[+-]?\d+$/)){

      // マッチしない場合は終了
      return false;

    }

    // 戻り値の設定
    return true;

  }

})();