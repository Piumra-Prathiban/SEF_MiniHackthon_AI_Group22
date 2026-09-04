import { AlertCircle, CalendarDays, Camera, CheckCircle2, MapPin } from 'lucide-react'
import { useState } from 'react'

const empty = { name:'', description:'', type:'Lost', location:'', date:'', contactInfo:'', imageUrl:'' }
const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2 || v.name.trim().length > 100) e.name = 'Enter an item name between 2 and 100 characters.'
  if (v.description.trim().length < 5 || v.description.trim().length > 1000) e.description = 'Add a helpful description between 5 and 1,000 characters.'
  if (v.location.trim().length < 2 || v.location.trim().length > 150) e.location = 'Enter a campus location between 2 and 150 characters.'
  if (!v.date) e.date = 'Select the date the item was lost or found.'
  else if (v.date > new Date().toISOString().slice(0,10)) e.date = 'The report date cannot be in the future.'
  if (v.contactInfo.trim().length < 3 || v.contactInfo.trim().length > 200) e.contactInfo = 'Enter a phone number or email so people can reach you.'
  if (v.imageUrl && !/^https?:\/\//i.test(v.imageUrl)) e.imageUrl = 'Use a complete image URL beginning with http:// or https://.'
  return e
}

export default function ReportForm({ initial, onSubmit, submitting, mode }) {
  const [values, setValues] = useState(() => initial ? { ...empty, ...initial } : empty)
  const [errors, setErrors] = useState({})
  const change = ({target:{name,value}}) => { setValues(v=>({...v,[name]:value})); if(errors[name]) setErrors(e=>({...e,[name]:undefined})) }
  const field = (name, label, props = {}) => <div className={`form-group ${props.full?'full':''}`}><label htmlFor={name}>{label} <span className="required">*</span></label><input id={name} name={name} value={values[name]} onChange={change} className={`field-control ${errors[name]?'has-error':''}`} {...props}/>{errors[name]&&<span className="field-error">{errors[name]}</span>}</div>
  const submit = (event) => { event.preventDefault(); const next=validate(values); setErrors(next); if(Object.keys(next).length===0) onSubmit(Object.fromEntries(Object.entries(values).map(([k,v])=>[k,typeof v==='string'?v.trim():v]))) }
  return <form className="form-grid" onSubmit={submit} noValidate>
    <div className="form-group full"><label>Report type <span className="required">*</span></label><div className="type-picker"><button type="button" className={`type-option ${values.type==='Lost'?'active':''}`} onClick={()=>setValues(v=>({...v,type:'Lost'}))}><AlertCircle size={18}/> I lost something</button><button type="button" className={`type-option ${values.type==='Found'?'active':''}`} onClick={()=>setValues(v=>({...v,type:'Found'}))}><CheckCircle2 size={18}/> I found something</button></div></div>
    {field('name','Item name',{placeholder:'e.g. Black leather wallet',maxLength:100,full:true})}
    <div className="form-group full"><label htmlFor="description">Description <span className="required">*</span></label><textarea id="description" name="description" value={values.description} onChange={change} className={`field-control ${errors.description?'has-error':''}`} maxLength={1000} placeholder="Include colour, brand, unique marks, or what was inside…"/>{errors.description&&<span className="field-error">{errors.description}</span>}</div>
    {field('location','Campus location',{placeholder:'e.g. Main Library',maxLength:150})}
    {field('date',values.type==='Lost'?'Date lost':'Date found',{type:'date',max:new Date().toISOString().slice(0,10)})}
    {field('contactInfo','Contact details',{placeholder:'Phone number or email',maxLength:200,full:true})}
    <div className="form-group full"><label htmlFor="imageUrl">Image URL <span style={{color:'var(--muted)',fontWeight:500}}>(optional)</span></label><input id="imageUrl" name="imageUrl" type="url" value={values.imageUrl} onChange={change} className={`field-control ${errors.imageUrl?'has-error':''}`} placeholder="https://example.com/item-photo.jpg"/>{errors.imageUrl&&<span className="field-error">{errors.imageUrl}</span>}</div>
    <div className="form-actions"><button type="button" className="btn btn-secondary" onClick={()=>window.history.back()} disabled={submitting}>Cancel</button><button className="btn btn-primary" disabled={submitting}>{submitting?'Saving…':mode==='edit'?'Save changes':'Publish report'}</button></div>
  </form>
}

export function ReportingTips() { return <aside className="side-card"><h3>A strong report helps</h3><div className="tip"><MapPin size={18}/><span>Use a specific campus building, room, or landmark.</span></div><div className="tip"><CalendarDays size={18}/><span>Choose the actual date, not the date you created the report.</span></div><div className="tip"><Camera size={18}/><span>Add a clear image URL if you have one, but avoid showing sensitive details.</span></div><div className="tip"><CheckCircle2 size={18}/><span>Mark the report resolved when the item reaches its owner.</span></div></aside> }
