[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="1736119585390.jpg"  time="1000"  ]
[tb_show_message_window  ]
[lovemng_set  scope="f"  id="1"  name="三浦蒼依"  love="3"  memo="三浦蒼依"  ]
[lovemng_set  scope="f"  id="2"  name="古山愛加"  love="3"  memo="古山愛加"  ]
[tb_start_text mode=1 ]
#運営
KCITに入学おめでとう！このゲームは各キャラクターの五段階ある好感度をMAXにするとゲームクリア、HAPPYENDを迎えられるよ！[p]
それでは頑張ってね！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
[lovemng_show id=1 props="name"]の現在の好感度は[lovemng_show id=1 props="love"]です。[p]
[lovemng_show id=2 props="name"]の現在の好感度は[lovemng_show id=2 props="love"]です。[p]

[_tb_end_text]

[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/Clipped_image_20250110_181717.png"  width="650"  height="400"  left="309"  top="76"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#三浦蒼依
二日酔いしたことないのにまじで吐きそうしぬ[p]
[_tb_end_text]

[glink  color="black"  storage="scene1.ks"  size="30"  text="助ける"  y="200"  width="200"  height="20"  x="540"  target="*はい"  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="助けない"  y="300"  width="200"  height="20"  x="540"  target="*いいえ"  ]
[s  ]
*はい

[tb_show_message_window  ]
[tb_start_text mode=1 ]
#あなた
うーん助けたいけど私一人じゃ助けられないや。[p]
[_tb_end_text]

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[chara_show  name="古山愛加"  time="1000"  wait="true"  storage="chara/2/Clipped_image_20250128_220328.png"  width="545"  height="1080"  left="353"  top="-7"  reflect="false"  ]
[tb_start_text mode=1 ]
#古山愛加
どうしたの？手伝うよ！！！[p]
[_tb_end_text]

[chara_hide  name="古山愛加"  time="1000"  wait="true"  pos_mode="true"  ]
[tb_hide_message_window  ]
[bg  time="1000"  method="crossfade"  storage="無題58_20250202104334.png"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#
愛加の手を借りて、蒼依の救出に成功した。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
この後どうする？[p]
[_tb_end_text]

[glink  color="black"  storage="scene1.ks"  size="30"  text="三人で遊ぶ"  y="200"  width="200"  height="20"  x="540"  target="*三人"  _clickable_img=""  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="蒼依と遊ぶ"  y="300"  width="200"  height="20"  x="540"  target="*あおたん"  _clickable_img=""  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="愛加と遊ぶ"  y="416"  width="200"  height="20"  x="538"  target="*まなたん"  _clickable_img=""  ]
[s  ]
*三人

[bg  time="1000"  method="crossfade"  storage="3番.jpg"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
三人で遊んでいると謎の乱入者が現れた。[p]
よくわからないが楽しんだ。[p]
[_tb_end_text]

[jump  storage="line.ks"  target=""  ]
*あおたん

[jump  storage="aoi_first.ks"  target=""  cond=""  ]
*まなたん

[jump  storage="manaka_first.ks"  target=""  ]
*いいえ

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[bg  time="1000"  method="crossfade"  storage="1736119921638.jpg"  ]
[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/Clipped_image_20250110_220200.png"  width="1000"  height="950"  left="164"  top="-96"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#三浦蒼依
[emb exp="f.name"]ちゃお？？？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
蒼依は怒っているようだ[p]
[_tb_end_text]

[glink  color="black"  storage="scene1.ks"  size="30"  text="謝る"  y="200"  width="200"  height="20"  x="540"  target="*ごめん"  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="無視"  y="300"  width="200"  height="20"  x="540"  target="*むっし"  ]
[s  ]
*ごめん

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/1番.png"  width="1325"  height="1036"  left="200"  top="-124"  reflect="false"  ]
[tb_start_text mode=1 ]
謝るくらいなら最初から助けてよ！私のこときらいなの！？[p]
[_tb_end_text]

[glink  color="black"  storage="scene1.ks"  size="30"  text="嫌いじゃない"  y="300"  width="200"  height="20"  x="540"  target="*ステイ"  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="元気じゃん"  y="200"  width="200"  height="20"  x="540"  target="*ダウン"  ]
[s  ]
*ステイ

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/Clipped_image_20250110_220200.png"  width="925"  height="888"  left="158"  top="-24"  reflect="false"  ]
[tb_start_text mode=1 ]
[emb exp="f.name"]ちゃおが何考えてるかよくわかんないよ…。[p]
[_tb_end_text]

[jump  storage="tuesday.ks"  target="*わっつ"  ]
*ダウン

[tb_start_text mode=1 ]
ふざけんなよおおおおおおおおお[p]
[_tb_end_text]

[lovemng_set  scope="f"  id="1"  name="三浦蒼依"  love="3"  memo="三浦蒼依"  ]
[lovemng_set  scope="f"  id="2"  name="古山愛加"  love="3"  memo="古山愛加"  ]
[lovemng_add  scope="f"  love="-1"  id="1"  memo="好感度減少"  ]
[tb_start_text mode=1 ]
三浦蒼依の好感度が1減少。[p]
[lovemng_show id=1 props="name"]の現在の好感度は[lovemng_show id=1 props="love"]です。[p]

[_tb_end_text]

[jump  storage="tuesday.ks"  target=""  ]
*むっし

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="false"  ]
[bg  time="1000"  method="crossfade"  storage="1736119921638.jpg"  ]
[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/Clipped_image_20250110_220200.png"  width="1000"  height="950"  left="164"  top="-96"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#三浦蒼依
私に無視はきかないよ[p]
[_tb_end_text]

[glink  color="black"  storage="scene1.ks"  size="30"  text="逃げる"  y="200"  width="200"  height="20"  x="540"  target="*まなｋ"  ]
[glink  color="black"  storage="scene1.ks"  size="30"  text="仲間になる"  y="300"  width="200"  height="20"  x="540"  target="*未定"  ]
[s  ]
*未定

[tb_start_text mode=1 ]
#あなた
分かった。蒼依ちゃんの仲間になるよ…。[p]
[_tb_end_text]

[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[chara_show  name="三浦蒼依"  time="1000"  wait="true"  storage="chara/1/2番.png"  width="1574"  height="1013"  left="-106"  top="-27"  reflect="false"  ]
[tb_start_text mode=1 ]
#三浦蒼依
仲間？よくわかんないけどいいね！これからよろしく！[p]
[_tb_end_text]

[jump  storage="tuesday.ks"  target=""  ]
*まなｋ

[bg  time="1000"  method="crossfade"  storage="1736119921638.jpg"  ]
[chara_hide  name="三浦蒼依"  time="1000"  wait="true"  pos_mode="true"  ]
[chara_show  name="古山愛加"  time="1000"  wait="true"  storage="chara/2/Clipped_image_20250128_220328.png"  width="545"  height="1080"  left="276"  top="20"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#？？？
[emb exp="f.name"]ちゃお！こっちだよ！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#古山愛加
私の名前は古山愛加！あなたを助けに来たの！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#
あなたは古山愛加に助けられ逃亡に成功した。[p]
[_tb_end_text]

[jump  storage="manaka_first.ks"  target=""  ]
[s  ]
