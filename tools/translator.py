from py_translator import Translator
import os
import json

translator = Translator(service_urls=['translate.google.cn'], timeout=5)
if input("Are you in China network? (To prevent the blockage of the GFW) (Y/N) ( Default:Y )\n").lower() in ["n", "no"]:
    translator.service_urls = ['translate.google.com']
    print(" > Source region edited.")

src_file = input("Input the src LangoPack file location:\n")
if os.path.exists(src_file):

    src_lang = input("Input the src language (all the supported languages are in the README.md file):\n")
    dest_lang = input(
        "Input the destination language (JSON List supported):" +
        "\n( JSON List Example: {\"languages\" : [\"ru\",\"ja\"]} )\n")

    if dest_lang:

        is_multi_dest = False

        if "{" in dest_lang and "}" in dest_lang:
            dest_lang = json.loads(dest_lang)["languages"]
            is_multi_dest = True


        def translate(src, dest, source_content):

            assert isinstance(source_content, dict)
            translating = dict(source_content)
            print(translating)
            print("ID:" + str(id(source_content)) + " " + str(id(translating)))

            for lango_id in translating:

                if "states" in translating[lango_id].keys():
                    for state in translating[lango_id]["states"]:
                        src_text = translating[lango_id]["states"][state]["text"]
                        translating[lango_id]["states"][state]["text"] = translator.translate(src_text, src=src,
                                                                                              dest=dest).text
                        print(src_text + " >> " + translating[lango_id]["states"][state]["text"])
                else:
                    src_text = translating[lango_id]["text"]
                    translating[lango_id]["text"] = translator.translate(src_text, src=src,
                                                                         dest=dest).text
                    print(str(src_text) + " >> " + str(translating[lango_id]["text"]))

            return translating


        def reload(whole=False):
            with open(src_file, mode='r', encoding="utf-8") as lango_pack_src:
                lango_pack_json = json.loads(lango_pack_src.read())
                if whole:
                    return dict(lango_pack_json)
                else:
                    return dict(lango_pack_json["contents"])


        def save(content, dest_lang_name):

            if not os.path.exists("translated"):
                os.makedirs("translated")

            loc = "translated\\" + dest_lang_name + ".json"
            import sys

            if "linux" in sys.platform:
                loc = "translated/" + dest_lang_name + ".json"

            with open(loc, mode="w", encoding="utf-8") as file:
                file.write(json.dumps(content))


        translated = {}
        if is_multi_dest:

            for dest_l in dest_lang:
                print("Translating into " + dest_l + ":")
                finished = translate(src_lang, dest_l, reload())
                translated[dest_l] = finished
        else:

            print("Translating into " + dest_lang + ":")
            finished = translate(src_lang, dest_lang, reload())
            translated[dest_lang] = finished

        for key in translated:
            whole_file = reload(True)
            whole_file["contents"] = translated[key]
            save(whole_file, key)

        if len(translated) > 1:
            print("All file translated. Please edit the 'language' option in each translated json file.")
        else:
            print("File translated. Please edit the 'language' option in the translated json file.")

    else:
        print("There is no destination for me to translate QAQ")

else:
    print("File doesn't exist.")
