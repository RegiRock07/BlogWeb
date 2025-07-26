import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'


//control react hook form se aata hai and yahi resposible hai state handling ke liye through 
//reference of the component(RTE) to the parent(form).

function RTE({ name, control, label, defaultValue = " " }) {
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1 pl-1 text-sm font-semibold text-gray-300'>
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}                       //parent element mei pass hoga toh vaha reference mil jaayega
                render={({ field: { onChange } }) => (   //you only chose the onChange from field object {value, onChange, onBlur, name, etc}

                    <Editor
                        apiKey={conf.tinymceApiKey}  // ✅ Add this line
                        initialValue={defaultValue}
                        init={{                           //initialize hote hi what values you need in the RTE
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            skin: "oxide-dark",           // 🌙 Dark theme skin
                            content_css: "dark",          // 🌙 Dark content styling
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: `
                                body {
                                    background-color: #2e2e2e;  /* 👈 Matte gray writing area */
                                    color: #f1f1f1;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 16px;
                                    padding: 1rem;
                                }

                                /* Toolbar buttons and icons */
                                .tox .tox-toolbar__primary {
                                    font-size: 16px;
                                }

                                .tox .tox-toolbar__group button {
                                    padding: 8px 12px;
                                    font-size: 16px;
                                }

                                .tox .tox-toolbar__group svg {
                                    width: 18px;
                                    height: 18px;
                                }
                            `
                        }}
                        onEditorChange={onChange}  //When user types, take that content, and pass it to onChange.
                    />
                )}
            />
        </div>
    )
}

export default RTE

//React Hook Form bhi tumhe referene lene ka tareeka deta hai --> jaise forward ref tha pehle

//In React Hook Form you do this using Controller.
//Controller ke andar give 4 properties---> {name, control, render , toolbar}

/*
🎯 The Key: Controller
Since TinyMCE is a custom uncontrolled component, React Hook Form can’t auto-register it. 
So you wrap it with a Controller, which handles:

Getting value (onChange)
Passing it to the form state
Reacting to updates

*/

/*
So TinyMCE gives the content → to React Hook Form via onChange.

🧠 Final Analogy: You're saying:

"React Hook Form, give me a way to send you data" → (you get onChange)
"TinyMCE, send typed content using this way" → (you plug in onEditorChange={onChange})
*/
