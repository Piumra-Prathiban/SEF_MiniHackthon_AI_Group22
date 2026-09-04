import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ReportForm, { ReportingTips } from '../components/ReportForm'
import { createItem, getItem, updateItem, uploadImage } from '../services/itemService'

export default function ReportPage({ mode }) {
  const { id } = useParams(); const navigate = useNavigate()
  const [item,setItem]=useState(null); const [loading,setLoading]=useState(mode==='edit'); const [submitting,setSubmitting]=useState(false); const [error,setError]=useState('')
  useEffect(()=>{ if(mode==='edit') getItem(id).then(setItem).catch(()=>setError('That report could not be loaded.')).finally(()=>setLoading(false)) },[id,mode])
  const submit = async(values,imageFile)=>{ setSubmitting(true);setError('');try{let reportValues=values;if(imageFile){const upload=await uploadImage(imageFile);reportValues={...values,imageUrl:upload.imageUrl}}const saved=mode==='edit'?await updateItem(id,reportValues):await createItem(reportValues);navigate(`/items/${saved.id}`,{state:{message:mode==='edit'?'Report updated successfully.':'Your report is now live.'}})}catch(error){setError(error.message||'We could not save your report. Please review the details and try again.');setSubmitting(false)} }
  if(loading) return <section className="form-page"><div className="container"><Loading label="Loading report…"/></div></section>
  return <section className="form-page"><div className="container form-layout"><div className="form-card"><div className="eyebrow">{mode==='edit'?'Update notice':'Help your community'}</div><h1>{mode==='edit'?'Edit report':'Report an item'}</h1><p className="form-intro">Share accurate details so the right person can recognise and recover the item.</p>{error&&<div className="status-message error-message">{error}</div>}<ReportForm initial={item} onSubmit={submit} submitting={submitting} mode={mode}/></div><ReportingTips/></div></section>
}
