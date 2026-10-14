import { ArrowDown, ArrowRight, ShieldAlert } from 'lucide-react';

export function CityRiskBrief({ go }: { go: (page: 'security' | 'friction' | 'simulator') => void }) {
  return <section className="risk-brief" aria-labelledby="risk-brief-title">
    <div className="risk-brief-heading"><span className="eyebrow">THE CITY SYSTEMIC RISK</span><span className="demo-stamp">EXAMPLE DATA · NOT LIVE INFRASTRUCTURE</span><ShieldAlert size={17} aria-hidden="true" /></div>
    <h2 id="risk-brief-title">When digital failure meets physical friction, streets become the attack surface.</h2>
    <div className="risk-chain" role="img" aria-label="Attack vector leads to compromised edge device, then lateral movement, then city gridlock">
      <span>ATTACK VECTOR</span><ArrowRight aria-hidden="true"/><span>COMPROMISED EDGE</span><ArrowRight aria-hidden="true"/><span>LATERAL MOVEMENT</span><ArrowRight aria-hidden="true"/><span className="chain-danger">PHYSICAL GRIDLOCK</span>
    </div>
    <div className="risk-brief-bottom">
      <div><b>01 / CYBER + PRIVACY</b><p>Exposed street devices, unauthenticated OT protocols, fleet update risks, GNSS interference, and re-identification through joined datasets.</p><button onClick={()=>go('security')}>EXPLORE SYSTEMIC VULNERABILITIES <ArrowDown size={12}/></button></div>
      <div><b>02 / OPERATIONAL FRICTION</b><p>Induced demand, closed MaaS data, curb conflicts, empty fleet miles, and fare systems that break at jurisdiction boundaries.</p><button onClick={()=>go('friction')}>EXPLORE TRANSPORT FRICTION <ArrowDown size={12}/></button></div>
      <div className="risk-brief-action"><span className="eyebrow">THE CRITICAL INTERSECTION</span><strong>Preemption spoofing<br/>× emergency traffic</strong><p>Or poisoned reroutes pushing heavy vehicles onto residential streets.</p><button onClick={()=>go('simulator')}>MODEL PHYSICAL CONSEQUENCES <ArrowRight size={13}/></button></div>
    </div>
  </section>;
}
