[_tb_system_call storage=system/_name.ks]

[cm  ]
[bg  time="1000"  method="crossfade"  storage="title.jpg"  ]
[tb_show_message_window  ]
*name_start

[tb_start_tyrano_code]
名前を入力してください[p]
[_tb_end_tyrano_code]

[edit  left="509"  top="317"  width="200"  height="40"  size="20"  maxchars="20"  name="f.name"  reflect="false"  ]
[button  storage="name.ks"  target="*nnnname"  graphic="イラスト29.png"  width="254"  height="97"  x="502"  y="422"  _clickable_img=""  ]
[s  ]
*nnnname

[commit  ]
[cm  ]
[jump  storage="name.ks"  target="*input_ok"  cond="f.name!=''"  ]
[jump  storage="name.ks"  target="*name_start"  ]
*input_ok

*input_fin

[tb_start_text mode=1 ]
#& f.name
私の名前は[emb exp="f.name"][p]
[_tb_end_text]

[tb_start_tyrano_code]
[commit]
[_tb_end_tyrano_code]

[jump  storage="scene1.ks"  target=""  ]
